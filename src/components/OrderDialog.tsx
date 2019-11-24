import React, { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import BasketIcon from '@material-ui/icons/ShoppingBasketRounded';
import { Fab, FormControl, FormControlLabel, FormLabel, Button, Radio, RadioGroup } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import StoreContext from '../context/StoreContext';

export default function ResponsiveDialog({ item }: { item: any }, { prices }: { prices: any }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { products } = useContext(StoreContext);
  const context = useContext(StoreContext);
  const garnish: any = products.find((it: any) => it.type === 'koret');
  const [value, setValue] = React.useState(item.name[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

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

  const getGarnishName = (item: any) => {
    console.log(item.name);
    return item.name;
  };

  const handleAddAndClose = () => {
    context.addProductToCart(item);
    handleClose();
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
          <DialogContentText>Mennyiség:{getItemCount(context.cart, item)}</DialogContentText>
        </DialogContent>
        {item.type === 'Frissensültek' && (
          <FormControl
            style={{
              display: 'flex',
              flexWrap: 'wrap'
            }}
            component="fieldset"
          >
            <FormLabel component="legend">Kérem válasszon köretet:</FormLabel>
            {Object.values(garnish.items).map((item: any) => (
              <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
                <FormControlLabel
                  value={item.name}
                  control={<Radio color="primary" />}
                  label={item.name}
                  onChange={() => getGarnishName(item)}
                  labelPlacement="start"
                />
              </RadioGroup>
            ))}
          </FormControl>
        )}
        <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            BEZÁRÁS
          </Button>
          <Button variant="contained" color="primary" onClick={handleAddAndClose}>
            HOZZÁADÁS KOSÁRHOZ
          </Button>
          {/*    <Fab
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
          </Fab> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
