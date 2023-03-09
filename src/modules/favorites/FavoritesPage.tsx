import React from 'react';
import { Avatar, Button, CircularProgress, Sheet, Typography } from '@mui/joy';
import WithHeaderLayout from '../../shared/layout/WithHeaderLayout';

function FavoritesPage() {
  const data = [
    {
      id:7040175,
      score:-80.05406,
      title:"کتاب پس از تو اثر جوجو مویز انتشارات آوای بی صدا",
      url:"https://www.digikala.com/product/dkp-7040175/کتاب-پس-از-تو-اثر-جوجو-مویز-انتشارات-آوای-بی-صدا",
      status:"marketable",
      imageUrl:"https://dkstatics-public.digikala.com/digikala-products/b5b2657ea5677918cd1d3091590a6b161e75247c_1636818068.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
      rate:{
        rate:100,
        count:1
      },
      price:"1000000"
    },
    {
      id:6955583,
      score:-82.92822,
      title:"کتاب سید مجتبی نواب صفوی اندیشه ها مبارزات و شهادت او اثر سیدحسین خوش نیت انتشارات مرکز اسناد",
      url:"https://www.digikala.com/product/dkp-6955583/کتاب-سید-مجتبی-نواب-صفوی-اندیشه-ها-مبارزات-و-شهادت-او-اثر-سیدحسین-خوش-نیت-انتشارات-مرکز-اسناد",
      status:"out_of_stock",
      imageUrl:"https://dkstatics-public.digikala.com/digikala-products/33e9e386db27309a5cb00308f697f02a96e5b107_1636223455.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
      rate:{
        rate:0,
        count:0
      },
      price:0
    },
  ];

  return (
    <WithHeaderLayout type="title" title="علاقه‌مندی‌ها">
      <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        padding: '16px',
      }}>
      {false ? (
        <CircularProgress />
      ) : (
        <>
          <h4>لیست علاقه‌مندی‌ها</h4>          
        </>
      )}
    </Sheet>
    </WithHeaderLayout>
)
}

export default FavoritesPage;
