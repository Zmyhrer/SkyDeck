from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Annotated
from database import get_db
from models import User
from schemas.user import UserLogin
from auth_utils import pwd_context, create_access_token  # import utils

router = APIRouter(prefix="/user", tags=["User"])

db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/login")
def login(user: UserLogin, db: db_dependency):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}
