from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Numeric
from database import Base

class Deck(Base):
    __tablename__ = 'deck'

    id = Column(Integer, primary_key=True, index=True)
    deck_name = Column(String, index=False)
    user_id = Column(Integer, ForeignKey("user.id"))

class Element(Base):
    __tablename__ = 'element'

    id = Column(Integer, primary_key=True, index=True)
    element_name = Column(String, index=False)
    element_operator = Column(String, index=False)
    element_value = Column(Numeric(10,2), index=False)
    deck_id = Column(Integer, ForeignKey("deck.id"))

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=False)
    password = Column(String, index=False)  
    email = Column(String, index=False)
    unit_system = Column(String, index=False)
    role = Column(String, index=False)
                     
