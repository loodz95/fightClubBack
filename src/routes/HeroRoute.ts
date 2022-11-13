import { Router } from 'express';
import { HeroController } from '../controllers/HeroController';

const heroRouter = Router();

const heroController = new HeroController();

heroRouter.get('/', (req, res ) =>  heroController.getAllHeros(req, res));
heroRouter.get('/:id', (req, res) => heroController.getOneHeroById(req, res));
heroRouter.post('/', (req, res) => heroController.createNewHero(req, res));
heroRouter.put('/:id', (req, res) => heroController.updateOneHero(req, res));
heroRouter.delete('/:id', (req, res) => heroController.deleteOneHero(req, res));

export default heroRouter;
