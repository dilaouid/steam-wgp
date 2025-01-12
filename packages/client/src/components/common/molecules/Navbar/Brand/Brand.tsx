import { Navbar } from 'react-bootstrap';

import { NavBrand } from '@ui/atoms';

export const Brand: React.FC = () => {
    return (
        <Navbar.Brand className='user-select-none'>
          <NavBrand />
        </Navbar.Brand>
    )
}