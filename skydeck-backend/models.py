from sqlalchemy import Column, ForeignKey, Integer, String, Numeric
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=False)
    password = Column(String, index=False)
    email = Column(String, index=False)
    unit_system = Column(String, index=False)
    role = Column(String, index=False)

    decks = relationship("Deck", back_populates="user")  # User -> Decks one-to-many

class Deck(Base):
    __tablename__ = 'deck'

    id = Column(Integer, primary_key=True, index=True)
    deck_name = Column(String, index=False)
    user_id = Column(Integer, ForeignKey("user.id"))

    user = relationship("User", back_populates="decks")  # Deck -> User many-to-one
    elements = relationship("Element", back_populates="deck")  # Deck -> Elements one-to-many

class Element(Base):
    __tablename__ = 'element'

    id = Column(Integer, primary_key=True, index=True)
    element_name = Column(String, index=False)
    element_operator = Column(String, index=False)
    element_value = Column(Numeric(10, 2), index=False)
    deck_id = Column(Integer, ForeignKey("deck.id"))

    deck = relationship("Deck", back_populates="elements")  # Element -> Deck many-to-one
