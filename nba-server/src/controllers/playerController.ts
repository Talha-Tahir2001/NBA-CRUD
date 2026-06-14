import type { Request, Response } from 'express';
import Player, { type IPlayer } from '../models/Player.js';

export const createPlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const player: IPlayer = new Player(req.body);
    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllPlayers = async (req: Request, res: Response): Promise<void> => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getPlayerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const player = await Player.findById(req.params['id']);
    if (!player) {
      res.status(404).json({ message: 'Player not found' });
      return;
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updatePlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params['id'],
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPlayer) {
      res.status(404).json({ message: 'Player not found' });
      return;
    }
    res.json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deletePlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPlayer = await Player.findByIdAndDelete(req.params['id']);
    if (!deletedPlayer) {
      res.status(404).json({ message: 'Player not found' });
      return;
    }
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};