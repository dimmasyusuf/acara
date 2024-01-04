'use server';

import { connectToDatabase } from '../database';
import Category from '../models/category.model';
import { handleError } from '../utils';
import { CreateCategoryParams } from '../../types/index';

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();

    const categories = await Category.find().sort({ name: 1 });

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
