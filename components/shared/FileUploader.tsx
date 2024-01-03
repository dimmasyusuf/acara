'use client';

import { Dispatch, SetStateAction, useCallback } from 'react';
import type { FileWithPath } from '@uploadthing/react';
import { useDropzone } from '@uploadthing/react/hooks';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { convertFileToUrl } from '@/lib/utils';
import { Button } from '../ui/button';
import Image from 'next/image';
import { RiUploadCloud2Fill } from 'react-icons/ri';

type FileUploadProps = {
  imageUrl: string;
  onFieldChange: (url: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export default function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {imageUrl ? (
        <div className="flex items-center justify-center h-72 bg-cover rounded-md border border-input">
          <Image
            src={imageUrl}
            alt="Event image"
            width={288}
            height={288}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md border border-input h-72">
          <RiUploadCloud2Fill className="w-20 h-20" />
          <h3 className=" mt-2 mb-2">Drag photo here</h3>
          <p className="mb-4">JPG, PNG, SVG</p>
          <Button
            type="button"
            size="lg"
          >
            Upload image
          </Button>
        </div>
      )}
    </div>
  );
}
