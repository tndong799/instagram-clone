import {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


import PropTypes from 'prop-types';
import {  Box,Tab, Tabs,Container } from '@mui/material';
import EditAccount from '../components/auth/EditAccount';
import ChangePassword from '../components/auth/ChangePassword';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
	return {
		id: `scrollable-force-tab-${index}`,
		'aria-controls': `scrollable-force-tabpanel-${index}`,
	}
}
const TabItem = {
	'/account/edit': 0,
	'/account/password/change': 1,
}
const style = {
  tab: {
    textTransform: 'none',
    color: '#262626',
    fontSize: '16px',
    lineHeight: '20px',
    padding: '16px 16px 16px 30px',
    textAlign: 'left',
    alignItems: 'flex-start'
  }
}

export default function Account() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState(TabItem[pathname]);

  const handleChange = (newValue, event) => {
    setValue(newValue);
  };
  const navigateTo = pathname => {
		navigate(pathname)
		handleChange(TabItem[pathname])
	}
 
  return (
    <div className='bg-[#fafafa] min-h-screen flex'>
      <Container maxWidth='md' className="mt-7 mb-10">
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: '100vh', border: '1px solid #dbdbdb' }}
        >
          <Tabs
            orientation="vertical"
            // variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', flexBasis: '236px', display:{xs: 'none', md: 'flex'}}}
            textColor='inherit'
            TabIndicatorProps={{style: {background:'#262626',width: '1px', left: 0, right: 'none'}}}
          >
            <Tab sx={style.tab} label="Chỉnh sửa trang cá nhân" {...a11yProps(0)} onClick={() => navigateTo('/account/edit')}   />
            <Tab sx={style.tab} label="Đổi mật khẩu" {...a11yProps(1)} onClick={() => navigateTo('/account/password/change')}  />
            
          </Tabs>
          <TabPanel value={value} index={0} className='flex-[1]' >
            <EditAccount></EditAccount>
          </TabPanel>
          <TabPanel value={value} index={1} className='flex-[1]'>
            <ChangePassword></ChangePassword>
          </TabPanel>
        </Box>
      </Container>
    </div>
  )
}
