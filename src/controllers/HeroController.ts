import { Request, Response } from 'express';
import { Hero } from '../models/interfaces/HeroInterface';
import { HeroService } from '../services/HeroService';

/**
 * Le role du controlleur est de gérer les requêtes,
 * il fait appelle au service qui lui permet de rappatrier
 * les données.
 */
export class HeroController {
  public heroService = new HeroService();

  async getAllHeros(req: Request, res: Response): Promise<void> {
    try {
      const allHeros = await this.heroService.getAllHeros();
      res.send({ status: 'OK', data: allHeros });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async getOneHeroById(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }
    try {
      const id = parseInt(paramId);
      const oneHero = await this.heroService.getOneHeroById(id);
      res.send({ status: 'OK', data: oneHero });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async createNewHero(req: Request, res: Response): Promise<void> {
    const newHero: Hero = {
      ...req.body,
    };
    console.log(newHero);
    if (
      !newHero.name ||
      newHero.power === undefined ||
      newHero.life === undefined 
    
    ) {
      res.status(400).send({
        status: 'FAILED',
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'power', 'life'",
        },
      });
      return;
    }

    try {
      await this.heroService.createNewHero(newHero);
      res.status(201).send({
        status: 'OK',
        message: `New hero created`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async updateOneHero(req: Request, res: Response): Promise<void> {
    const changes: Hero = {
      ...req.body,
    };
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    } else if (!changes.name || !changes.power || !changes.life) {
      res.status(400).send({
        status: 'FAILED',
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'power', 'life'",
        },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.heroService.updateOneHero(id, changes);
      res.status(201).send({
        status: 'OK',
        message: `Hero with id ${id} updated`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async deleteOneHero(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.heroService.deleteOneHero(id);
      res
        .status(200)
        .send({ status: 'OK', message: `Hero with id ${id} removed` });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }
}
