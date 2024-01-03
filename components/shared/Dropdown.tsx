import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { ICategory } from '@/lib/models/category.model';
import { startTransition, useState } from 'react';
import { Input } from '../ui/input';
import { PlusCircledIcon } from '@radix-ui/react-icons';

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

export default function Dropdown({ onChangeHandler, value }: DropdownProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');

  const handleAddCategory = () => {};

  return (
    <Select
      onValueChange={onChangeHandler}
      defaultValue={value}
    >
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder="Category"
          className="placeholder:text-muted-foreground"
        />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category.name}
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="flex items-center gap-2 w-full py-1.5 rounded-md pl-2 pr-8 text-sm">
            <PlusCircledIcon />
            Create Category
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
}
