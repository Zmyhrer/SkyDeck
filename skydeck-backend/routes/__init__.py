from fastapi import APIRouter
from routes.user import router as user_router
from routes.deck import router as deck_router
from routes.element import router as element_router
from routes.auth import router as auth_router

router = APIRouter()
router.include_router(user_router)
router.include_router(deck_router)
router.include_router(element_router)
router.include_router(auth_router) 
