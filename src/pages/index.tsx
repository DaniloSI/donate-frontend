import { useState, useEffect } from 'react';

import type { NextPage } from 'next';
import Head from 'next/head';

import AutocompleteTags from '@/components/AutocompleteTags';
import Item from '@/components/Item';
import { IListItem } from '@/interfaces/item';
import { Box, Paper, Typography } from '@mui/material';
import api from 'src/services/api';

const Home: NextPage = () => {
  const [items, setItems] = useState<IListItem[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get('/items');
      setItems(response.data);
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ display: 'flex' }}>
        <Box component="aside" sx={{ width: 432, mr: 2 }}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="h6">Filtro</Typography>
            <Box
              sx={{
                '& .MuiTextField-root': { mt: 4 },
              }}
            >
              <AutocompleteTags />
            </Box>
          </Paper>
        </Box>
        <Box component="main" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
          {items.map((item) => (
            <Box key={item.title} sx={{ p: 1 }}>
              <Item item={item} />
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Home;
