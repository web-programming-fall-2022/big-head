import React, { useState, useRef } from 'react';

import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import { useDebounceEffect } from '../../shared/utils/useDebounceEffect';
import 'react-image-crop/dist/ReactCrop.css';
import { Box, Button, Input, Typography } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { SearchServiceService, v1Ranker } from '../../api';
import WithHeaderLayout from '../../shared/layout/WithHeaderLayout';
import { canvasPreview } from '../../shared/utils/canvasPreview';

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
      setCrop(undefined);
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
        const data = await canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop
        );
        setDataUrl(data);
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
  }

  return (
    <WithHeaderLayout>
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
                onChange={(_, percentCrop) => {
                  console.log('onChange');
                  setCrop(percentCrop);
                }}
                onComplete={c => {
                  console.log('onComplete');
                  setCompletedCrop(c);
                }}>
                <img ref={imgRef} alt="Crop me" src={imgSrc} />
              </ReactCrop>
            </>
          )}
          {!!completedCrop?.width && (
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid white',
                objectFit: 'contain',
                width: '256px',
                height: '256px',
              }}
            />
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
    </WithHeaderLayout>
  );
}
