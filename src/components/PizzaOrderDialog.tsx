import React, { useContext, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import BasketIcon from '@material-ui/icons/ShoppingBasketRounded';
import { Fab, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import StoreContext from '../context/StoreContext';
import _ from 'lodash';

interface Props {
  item: any;
}

export default function ResponsiveDialog({ item }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize]: [null | number, any] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { products } = useContext(StoreContext);
  const context = useContext(StoreContext);
  const extrasList: any = products.find((it: any) => it.type === 'extras');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getItemCount = (cart: any, product: any) => {
    const item = cart.find((it: any) => it.id === product.id);
    return item === undefined ? 0 : item.quantity;
  };

  return (
    <div>
      <BasketIcon onClick={handleClickOpen} style={{ color: 'red', cursor: 'pointer' }} />
      <Dialog
        style={{ minWidth: 300, height: 'auto' }}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <h2>{item.name}</h2>
        </DialogTitle>
        <DialogContent>
          <FormControl style={{ minWidth: 100 }}>
            <InputLabel htmlFor="size-simple">Méret</InputLabel>
            <Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              inputProps={{
                name: 'size',
                id: 'size-simple'
              }}
            >
              <MenuItem value={25}>25cm</MenuItem>
              <MenuItem value={30}>30cm</MenuItem>
              <MenuItem value={35}>35cm</MenuItem>
              <MenuItem value={50}>50cm</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleClose}>
            BEZÁRÁS
          </Button>
        </DialogContent>
        {_.isNumber(selectedSize) && (
          <DialogContent>
            <DialogContentText>
              <span style={{ color: 'steelblue' }}>
                <span style={{ fontWeight: 'bold', color: 'dimgrey' }}>Feltétek: </span>
                {item.details}
              </span>
            </DialogContentText>
            <DialogContentText>Mennyiség:{getItemCount(context.cart, item)}</DialogContentText>
            {Array.isArray(item.price) &&
              item.price.map((it: any, index: number) => (
                <span key={index}>
                  Ár: {it.value + ' '}
                  Ft
                </span>
              ))}
            <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Fab
                style={{ backgroundColor: 'forestgreen' }}
                onClick={() => context.addProductToCart(item)}
                size="small"
                color="secondary"
                aria-label="add"
              >
                <AddIcon style={{ backgroundColor: 'forestgreen' }} />
              </Fab>
              <Fab onClick={() => context.removeProductFromCart(item.id)} size="small" color="secondary" aria-label="remove">
                <Remove />
              </Fab>
            </DialogActions>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
