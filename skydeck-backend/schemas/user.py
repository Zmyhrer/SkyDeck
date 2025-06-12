from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    password: str
    email: str
    unit_system: str
    role: str

class UserLogin(BaseModel):
    username: str
    password: str