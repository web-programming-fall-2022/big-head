import { useQuery } from '@tanstack/react-query';
import { SearchServiceService, v1GetSearchHistoriesResponse } from '../../api';
import WithHeaderLayout from '../../shared/layout/WithHeaderLayout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Card,
  CircularProgress,
  Divider,
  Grid,
  Sheet,
  Typography,
} from '@mui/joy';
import ResultItem from './SearchResultItem';

function SearchHistoryPage() {
  const { data: searchHistory, isLoading: searchHistoryLoading } = useQuery(
    ['searchHistory'],
    () =>
      SearchServiceService.searchServiceGetSearchHistories({
        limit: 10,
        offset: 0,
      })
  );
  return (
    <WithHeaderLayout type="title" title="تاریخچه">
      <Sheet
        sx={{
          padding: '10px',
          gap: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}>
        {searchHistoryLoading && <CircularProgress />}
        <Typography>
          {searchHistory &&
            (searchHistory as v1GetSearchHistoriesResponse)!.histories &&
            (searchHistory as v1GetSearchHistoriesResponse)!.histories!.length >
              0 &&
            (searchHistory as v1GetSearchHistoriesResponse)!.histories
              ?.length}{' '}
          جستجوی اخیر شما
        </Typography>
        <Typography>
          {searchHistory &&
            (searchHistory as v1GetSearchHistoriesResponse)!.histories &&
            (searchHistory as v1GetSearchHistoriesResponse)!.histories!
              .length === 0 &&
            'شما هنوز هیچ جستجویی انجام نداده‌اید'}
        </Typography>
        {(searchHistory &&
          (searchHistory as v1GetSearchHistoriesResponse)!.histories?.map(
            (item, index) => (
              <Card
                key={index}
                sx={{
                  border: '1px solid #dddddd',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  padding: '10px',
                  borderRadius: '10px',
                  margin: '10px',
                  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.24)',
                }}>
                <img
                  style={{
                    maxWidth: '100px',
                    borderRadius: '10px',
                  }}
                  src={'data:image/png;base64, ' + `${item.image!.toString()}`}
                />

                <Divider
                  sx={{
                    width: '100%',
                    height: '3px',
                    margin: '10px 0',
                  }}
                />

                <Sheet
                  sx={{
                    padding: '16px',
                    height: '100%',
                    width: '100%',
                  }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}>
                    {item.products!.map(product => (
                      <ResultItem
                        key={product.id}
                        product={product}
                        maxWith="200px"
                      />
                    ))}
                  </Grid>
                </Sheet>
              </Card>
            )
          )) ||
          []}
      </Sheet>
    </WithHeaderLayout>
  );
}

export default SearchHistoryPage;
