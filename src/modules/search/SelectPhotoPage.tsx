import React, { useState, useRef } from 'react';

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';

import 'react-image-crop/dist/ReactCrop.css';
import { Box, Button, Input, Typography } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { SearchServiceService, v1Ranker } from '../../api';

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function SelectPhotoPage() {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [dataUrl, setDataUrl] = useState<string>();

  const { mutateAsync: search, isLoading: isSearching } = useMutation({
    mutationFn: SearchServiceService.searchServiceSearch,
  });

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || '')
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        setDataUrl(
          await canvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            completedCrop
          )
        );
      }
    },
    100,
    [completedCrop]
  );

  function onSubmitCrop() {
    if (dataUrl === null) {
      return;
    }
    search({
      image: dataUrl!.replace(/^data:image\/\w+;base64,/, ''),
      params: {
        top_k: 10,
        ranker: v1Ranker.FIRST_IMAGE,
      },
    });
    // if (completedCrop) {
    //   // create a canvas element to draw the cropped image
    //   const canvas = document.createElement('canvas');

    //   // get the image element
    //   const image = imgRef.current;

    //   // draw the image on the canvas
    //   if (image) {
    //     const crop = completedCrop;
    //     const scaleX = image.naturalWidth / image.width;
    //     const scaleY = image.naturalHeight / image.height;
    //     const ctx = canvas.getContext('2d');
    //     const pixelRatio = window.devicePixelRatio;
    //     canvas.width = crop.width * pixelRatio * scaleX;
    //     canvas.height = crop.height * pixelRatio * scaleY;

    //     if (ctx) {
    //       ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    //       ctx.imageSmoothingQuality = 'high';

    //       const scaleResize = 256 / crop.width;

    //       console.log(
    //         'crop.width * scaleX * scaleResize',
    //         crop.width * scaleX * scaleResize
    //       );

    //       ctx.drawImage(
    //         image,
    //         crop.x * scaleX,
    //         crop.y * scaleY,
    //         crop.width * scaleX * scaleResize,
    //         crop.height * scaleY * scaleResize,
    //         0,
    //         0,
    //         crop.width * scaleX * scaleResize,
    //         crop.height * scaleY * scaleResize
    //       );
    //     }

    //     const base64Image = canvas.toDataURL('image/png'); // can be changed to jpeg/jpg etc
    //     // compress the image

    //     if (base64Image) {
    //       // @ts-ignore
    //       const fileType = base64Image.split(';')[0].split(':')[1];

    //       // const buffer = Buffer.from(
    //       //   base64Image.replace(/^data:image\/\w+;base64,/, ''),
    //       //   'base64'
    //       // );
    //       // const file = new File([buffer], 'fileName', { type: fileType });

    //     }
    //   }
    // }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll',
      }}>
      <Typography
        level="h4"
        component="h4"
        sx={{
          textAlign: 'center',
          my: '1rem',
        }}>
        برای شروع یک عکس انتخاب کنید
      </Typography>
      <Box sx={{ maxWidth: '500px' }}>
        <Input type="file" onChange={onSelectFile} />
        {!!imgSrc && (
          <>
            <Typography
              level="body1"
              component="p"
              sx={{
                textAlign: 'center',
                my: '1rem',
              }}>
              تصویر انتخابی خود را کراپ کنید
            </Typography>
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={c => setCompletedCrop(c)}>
              <img ref={imgRef} alt="Crop me" src={imgSrc} />
            </ReactCrop>
          </>
        )}

        <Button
          sx={{
            my: '1rem',
            width: '100%',
          }}
          loading={isSearching}
          onClick={onSubmitCrop}>
          جستجو
        </Button>
      </Box>
    </Box>
  );
}
