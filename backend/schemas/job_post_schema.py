from datetime import date, datetime
from pydantic import BaseModel
from typing import List, Optional
from schemas.employer_schema import Employer

class PostJobPost(BaseModel):
    job: str
    description: str
    job_location: str
    job_level: str
    job_type: str
    job_responsibilities: str
    skills: str
    minimum_years_of_experience: str
    education_required: str
    no_of_vacancy: str
    work_hours: str
    min_salary: int
    max_salary: int
    job_benefits: str
    job_start_date: datetime
    remote_onsite: str
    deadline: datetime

    class Config:
        orm_mode = True

class UpdateJobPost(BaseModel):
    job: str
    description: str
    job_location: str
    job_level: str
    job_type: str
    job_responsibilities: List[str]
    skills: List[str]
    minimum_years_of_experience: int
    education_required: str
    no_of_vacancy: int
    work_hours: str
    min_salary: int
    max_salary: int
    job_benefits: List[str]
    job_start_date: datetime
    remote_onsite: str
    status_of_jobs: str
    posted_date: datetime
    deadline: datetime

    class Config:
        orm_mode = True

class JobPost(BaseModel):
    id: int
    job: str
    description: str
    job_location: str
    job_level: str
    job_type: str
    job_responsibilities: List[str]
    skills: List[str]
    minimum_years_of_experience: int
    education_required: str
    no_of_vacancy: int
    work_hours: str
    min_salary: int
    max_salary: int
    job_benefits: List[str]
    job_start_date: date
    remote_onsite: str
    status_of_jobs: str
    posted_date: date
    deadline: date

    class Config:
        orm_mode = True

class JobPostShow(JobPost):
    employer: Optional[Employer]

    class Config:
        orm_mode = True

class JobPostApply(JobPost):
    from schemas.apply_schema import Apply
    apply: Optional[Apply]

    class Config:
        orm_mode = True

class JobPostRemainder(JobPost):
    from schemas.apply_schema import Apply
    apply: Optional[Apply]

    class Config:
        orm_mode = True