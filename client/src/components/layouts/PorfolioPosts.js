import {useState, useContext, useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { PostContext } from '../../contexts/PostContext'
import {Tabs, Tab, Box} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';



const TabItem = (username, key) => {
  const tab = {
    [`/${username}`]: 0,
    [`/${username}/saved`]: 1,
    [`/${username}/tagged`]: 2
  }
  return tab[key]
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function PorfolioPosts() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const {authState: {porfolioUser: {username}}} = useContext(AuthContext)
  const {getPostsUser} = useContext(PostContext)
  const [value, setValue] = useState(TabItem(username,pathname));


  const handleChange = (newValue, event) => {
    setValue(newValue);
};
  const navigateTo = pathname => {
		navigate(pathname)
		handleChange(TabItem(username,pathname))
	}



    useEffect(() => {
      const getPosts = async (username) => {
        try {
          await getPostsUser(username)
        } catch (error) {
          console.log(error)
        }
      }
      getPosts(username)
    },[username])
  return (
    <>
    <Box sx={{ borderTop: 1, borderColor: 'divider', marginBottom: '10px' }}>
      <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
          centered
          textColor='inherit'
          TabIndicatorProps={{style: {background:'#262626', height: '1px', top: 0, bottom: 'none'}}}
          
      >
        <Tab onClick={() => navigateTo(`/${username}`)} icon={<GridViewIcon fontSize='small' />} {...a11yProps(0)} iconPosition="start" label="Bài viết" sx={{marginRight:{ xs: '30px', md: '60px'}, color: '#262626',fontSize: '12px', padding: 0, minHeight:{ xs: '36px', md: '55px'}}}/>
        <Tab onClick={() => navigateTo(`/${username}/saved`)} icon={<BookmarkAddedIcon fontSize='small' />} {...a11yProps(1)} iconPosition="start" label="Đã lưu" sx={{marginRight:{ xs: '30px', md: '60px'},color: '#262626',fontSize: '12px',padding: 0, minHeight:{ xs: '36px', md: '55px'}}}/>
        <Tab onClick={() => navigateTo(`/${username}/tagged`)} icon={<AssignmentIndIcon fontSize='small' />} {...a11yProps(2)} iconPosition="start" label="Được gắn thẻ" sx={{color: '#262626',fontSize: '12px', padding: 0, minHeight:{ xs: '36px', md: '55px'}}} />
      </Tabs>
    </Box>
    <Outlet />
    </>

  )
}
