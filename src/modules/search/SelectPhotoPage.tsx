import React, { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import { useDebounceEffect } from '../../shared/utils/useDebounceEffect';
import 'react-image-crop/dist/ReactCrop.css';
import { Box, Button, Grid, Input, Sheet, Typography } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { SearchServiceService, v1Ranker, v1SearchResponse } from '../../api';
import WithHeaderLayout from '../../shared/layout/WithHeaderLayout';
import { canvasPreview } from '../../shared/utils/canvasPreview';
import ResultItem from './SearchResultItem';

export default function SelectPhotoPage() {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [dataUrl, setDataUrl] = useState<string>();
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  const {
    mutateAsync: search,
    isLoading: isSearching,
    data: searchResult,
  } = useMutation({
    mutationFn: SearchServiceService.searchServiceSearch,
    onSuccess: () => {
      setShowSearchResults(true);
    },
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
      <Sheet
        sx={{
          height: '100%',
        }}>
        {showSearchResults && (
          <>
            <Typography
              level="h4"
              component="h4"
              sx={{
                textAlign: 'center',
                my: '1rem',
              }}>
              نتایج جستجو
            </Typography>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}>
              {(searchResult as v1SearchResponse).products!.map(product => (
                <ResultItem key={product.id} product={product} />
              ))}
            </Grid>
            <Sheet
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                my: '1rem',
                p: '1rem',
              }}>
              <Button
                sx={{
                  width: '50%',
                }}
                loading={isSearching}
                onClick={() => {
                  setShowSearchResults(false);
                  setImgSrc('');
                }}>
                جستجوی جدید
              </Button>
            </Sheet>
          </>
        )}
        {!showSearchResults && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
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
              <Sheet>
                {!!imgSrc && !!completedCrop?.width && (
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      border: '1px solid white',
                      objectFit: 'contain',
                      width: '256px',
                      height: '256px',
                      display: 'none',
                    }}
                  />
                )}
              </Sheet>

              <Button
                sx={{
                  my: '1rem',
                  width: '100%',
                }}
                loading={isSearching}
                disabled={imgSrc === ''}
                onClick={onSubmitCrop}>
                جستجو
              </Button>
            </Box>
          </Box>
        )}
      </Sheet>
    </WithHeaderLayout>
  );
}
