import React, { useState, useRef } from 'react';

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
import ResultItem from './ResultItem';

import 'react-image-crop/dist/ReactCrop.css';
import { Box, Button, Input, Typography, Grid } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import {
  SearchServiceService,
  v1Ranker,
  v1SearchRequest,
  v1SearchResponse,
} from '../../api';

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

// const DOMMY_DATA = [
//   {
//     id: 1,
//     title: 'در جستجوی زمان',
//     url: 'https://www.digikala.com/product/dkp-7943292/برچسب-تخم-مرغ-تزیینی-مدل-هفت-سین-نوروز-rd-مجموعه-60-عددی/',
//     status: 'marketable',
//     image_url:
//       'https://dkstatics-public.digikala.com/digikala-products/2ce89596111dece459ac930e94cbd15bf0b9072f_1645712256.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80',
//     rate: {
//       count: 3.9,
//     },
//     price: '1200000',
//   },
//   {
//     id: 2,
//     title: 'در جستجوی زمان',
//     url: 'https://www.digikala.com/product/dkp-7943292/برچسب-تخم-مرغ-تزیینی-مدل-هفت-سین-نوروز-rd-مجموعه-60-عددی/',
//     status: 'marketable',
//     image_url: "https://dkstatics-public.digikala.com/digikala-products/895833307888f62e31dfb561c808f16e49e7e987_1615039495.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",

//     rate: {
//       count: 3.9,
//     },
//     price: '1200000',
//   },
//   {
//     id: 3,
//     title: 'در جستجوی زمان',
//     url: 'https://www.digikala.com/product/dkp-7943292/برچسب-تخم-مرغ-تزیینی-مدل-هفت-سین-نوروز-rd-مجموعه-60-عددی/',
//     status: 'ناموجود',
//     image_url:
//       'https://dkstatics-public.digikala.com/digikala-products/2ce89596111dece459ac930e94cbd15bf0b9072f_1645712256.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80',
//     rate: {
//       count: 3.9,
//     },
//     price: '1200000',
//   },
//   {
//     id: 4,
//     title: 'در جستجوی زمان',
//     url: 'https://www.digikala.com/product/dkp-7943292/برچسب-تخم-مرغ-تزیینی-مدل-هفت-سین-نوروز-rd-مجموعه-60-عددی/',
//     status: 'ناموجود',
//     image_url:
//       'https://dkstatics-public.digikala.com/digikala-products/2ce89596111dece459ac930e94cbd15bf0b9072f_1645712256.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80',
//     rate: {
//       count: 3.9,
//     },
//     price: '1200000',
//   },
//   {
//     id: 5,
//     title: 'در جستجوی زمان',
//     url: 'https://www.digikala.com/product/dkp-7943292/برچسب-تخم-مرغ-تزیینی-مدل-هفت-سین-نوروز-rd-مجموعه-60-عددی/',
//     status: 'ناموجود',
//     image_url:
//       'https://dkstatics-public.digikala.com/digikala-products/2ce89596111dece459ac930e94cbd15bf0b9072f_1645712256.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80',
//     rate: {
//       count: 3.9,
//     },
//     price: '1200000',
//   },
//   {
//     id: 6,
//     title: 'در جستجوی زمان',
//     url: 'https://www.digikala.com/product/dkp-7943292/برچسب-تخم-مرغ-تزیینی-مدل-هفت-سین-نوروز-rd-مجموعه-60-عددی/',
//     status: 'ناموجود',
//     image_url:
//       'https://dkstatics-public.digikala.com/digikala-products/2ce89596111dece459ac930e94cbd15bf0b9072f_1645712256.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80',
//     rate: {
//       count: 3.9,
//     },
//     price: '1200000',
//   },
// ];

export default function SelectPhotoPage() {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [dataUrl, setDataUrl] = useState<string>();
  const [searchResult, setSearchResult] = useState<v1SearchResponse>();

  const { mutateAsync: search, isLoading: isSearching } = useMutation({
    // mutationFn: SearchServiceService.searchServiceSearch,
    mutationFn: async (data: v1SearchRequest) => {
      return SearchServiceService.searchServiceSearch(data);
    },
    onSuccess: data => {
      setSearchResult(data as v1SearchResponse);
    },
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
      {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ flexGrow: 1, width: "100%", padding: "2rem" }}>
        {DOMMY_DATA.map(product => (
          <Grid xs={4} sm={4} md={4} key={product.id} sx={{display: "flex", justifyContent: "center"}}>
            <ResultItem title={product.title} url={product.url} status={product.status} imageUrl={product.image_url} rateCount={product.rate.count} price={product.price} />
    </Grid>
  ))}
</Grid> */}
    </Box>
  );
}
