'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { eventFormSchema } from '@/lib/validator';
import { eventDefaultValues } from '@/constants';
import Dropdown from './Dropdown';
import { Textarea } from '../ui/textarea';
import FileUploader from './FileUploader';
import { useState } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { Checkbox } from '../ui/checkbox';
import { CalendarIcon, Link2Icon, SewingPinIcon } from '@radix-ui/react-icons';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

import { useUploadThing } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
import { createEvent } from '@/lib/actions/event.actions';

type EventFormProps = {
  userId: string;
  type: 'Create' | 'Update';
};

export default function EventForm({ userId, type }: EventFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues = eventDefaultValues;
  const { startUpload } = useUploadThing('imageUploader');
  const router = useRouter();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile',
        });
        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Event Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center rounded-s-md h-9 w-9 border border-input border-e-0">
                      <SewingPinIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <Input
                      placeholder="Event Location or Online"
                      className="rounded-s-none"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center rounded-s-md h-9 w-9 border border-input border-e-0">
                      <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex h-9 w-full rounded-e-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground gap-4 items-center">
                      <p className="whitespace-nowrap">Start Date:</p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="py-1"
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center rounded-s-md h-9 w-9 border border-input border-e-0">
                      <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex h-9 w-full rounded-e-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground gap-4 items-center">
                      <p className="whitespace-nowrap">End Date:</p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="py-1"
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center w-full border border-input rounded-md">
                    <div className="flex items-center justify-center rounded-s-md h-9 w-9">
                      <RiMoneyDollarCircleLine className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex gap-4 items-center w-full">
                      <Input
                        type="number"
                        placeholder="Price"
                        className="rounded-s-none rounded-e-none border-y-0 border-e-0"
                        {...field}
                      />
                      <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center gap-2 px-2 py-1">
                                <label
                                  htmlFor="isFree"
                                  className="whitespace-nowrap text-sm text-muted-foreground"
                                >
                                  Free Ticket
                                </label>
                                <Checkbox
                                  onCheckedChange={field.onChange}
                                  checked={field.value}
                                  id="isFree"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center rounded-s-md h-9 w-9 border border-input border-e-0">
                      <Link2Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <Input
                      placeholder="URL"
                      className="rounded-s-none"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="mt-4"
        >
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
}
