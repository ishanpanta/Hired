import shutil
from fastapi import APIRouter, Depends, HTTPException, status

from models import apply, user
from core import database, hashing, oauth2
from sqlalchemy.orm import Session
from typing import List
from forms import applyForm


router = APIRouter(
    tags=['Apply'],
    prefix="/apply"
)


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def createApplyProfile(form: applyForm.ApplyForm = Depends(), db: Session = Depends(database.get_db), current_user: user.User = Depends(oauth2.get_user_job_seeker)):
    cv_file_location = None
    cover_letter_file_location = None

    # upload cv in local memory and save the file_location in database
    try:
        cv_file_location = f"static/cv/{form.cv.filename}"
        with open(cv_file_location, "wb") as buffer:
            shutil.copyfileobj(form.cv.file, buffer)
    except:
        cv_file_location = None

    # upload cover letter
    try:
        cover_letter_file_location = f"static/cover_letters/{form.coverletter.filename}"
        with open(cover_letter_file_location, "wb") as buffer:
            shutil.copyfileobj(form.profile_photo.file, buffer)
    except:
        cover_letter_file_location = None

    new_apply = apply.Apply(
        description=form.description, cv=cv_file_location,  status=form.status,
        coverletter=cover_letter_file_location,  applied_date=form.applied_date, seeker_id=current_user.seeker[0].id, job_post_id=2)

    db.add(new_apply)
    db.commit()
    db.refresh(new_apply)
    return new_apply


@router.put('/update/{id}', status_code=status.HTTP_202_ACCEPTED)
def update(id: int, form: applyForm.ApplyForm = Depends(), db: Session = Depends(database.get_db), current_user: user.User = Depends(oauth2.get_user_job_seeker)):
    update_apply = db.query(apply.Apply).filter(
        apply.Apply.id == id)

    if not update_apply.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Apply with id {id} not found")

    cv_file_location = update_apply.first().cv
    cover_letter_file_location = update_apply.first().profilePhoto

    # upload cv
    try:
        cv_file_location = f"static/cv/{form.cv.filename}"
        # if the new choosen pdf is not same as the previous upload pdf file then only upload updated pdf.
        if update_apply.first().cv != cv_file_location:
            with open(cv_file_location, "wb") as buffer:
                shutil.copyfileobj(form.cv.file, buffer)
        # if same then the pdf remains the same.
        else:
            cv_file_location = update_apply.first().cv
    except:
        cv_file_location = update_apply.first().cv

    # upload cover letter
    try:
        cover_letter_file_location = f"static/profile_pictures/{form.profile_photo.filename}"
        # if the new choosen cover letter is not same as the previous upload cover letter then only upload updated pdf.
        if update_apply.first().profilePhoto != cover_letter_file_location:
            with open(cover_letter_file_location, "wb") as buffer:
                shutil.copyfileobj(form.profile_photo.file, buffer)
        else:
            cover_letter_file_location = update_apply.first().profilePhoto
    except:
        cover_letter_file_location = update_apply.first().profilePhoto

    update_apply.update({"description": form.description, "cv": cv_file_location,  "status": form.status,
        "coverletter": cover_letter_file_location,  "applied_date": form.applied_date, "seeker_id": current_user.seeker[0].id, "job_post_id": 1})
    db.commit()
    return {"msg": "success"}


# , response_model=List[schemas.Showapply]
@router.get('/get_all')
def all(db: Session = Depends(database.get_db), current_user: user.User = Depends(oauth2.get_user_job_seeker)):
    applys = db.query(apply.Apply).all()
    return applys


# , response_model=schemas.apply
@router.get('/get_id/{id}')
def show(id: int, db: Session = Depends(database.get_db), current_user: user.User = Depends(oauth2.get_user_job_seeker)):
    hired_apply = db.query(apply.Apply).filter(
        apply.Apply.id == id).first()
    if not hired_apply:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Sekeer with the id {id} is not available")
    # , "experience": hired_apply.experience[0].workPlace
    return {"name": hired_apply.name, "cv": hired_apply.cv, "user": hired_apply.user, "user_assesment": hired_apply.userAssesment}
    # return apply