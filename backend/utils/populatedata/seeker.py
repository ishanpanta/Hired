from typing import List
from pydantic import Json


seekers: List[Json] = [
    {
        "name": "Job seeker",
        "age": 20,
        "address": "Banepa",
        "contactNumber": "9841234567",
        "write_about_you": "i am handsome",
        "yearsOfExperience": 0,
        "student": True,
        "skills": ["css", "django"],
        "linkedIn": None,
        "website": None,
        "cv": None,
        "githubProfile": None,
        "profilePhoto": None,
        "drivingLicenseNum": None,
        "last_job_applied": None,
        "user_id": 1
    },
    {
        "name": "Job seeker2",
        "age": 22,
        "address": "Kathmandu",
        "contactNumber": "9841234567",
        "write_about_you": "i am beautiful",
        "yearsOfExperience": 2,
        "student": False,
        "skills": ["ml", "dl"],
        "linkedIn": None,
        "website": None,
        "cv": None,
        "githubProfile": None,
        "profilePhoto": None,
        "drivingLicenseNum": None,
        "last_job_applied": None,
        "user_id": 2
    }
]