import {useState, useContext, useEffect} from 'react';
import { AuthContext } from '../../contexts/AuthContext'
import { PostContext } from '../../contexts/PostContext'
import {Tabs, Tab, Box, Typography, ImageList, ImageListItem} from '@mui/material';
import PropTypes from 'prop-types';
import GridViewIcon from '@mui/icons-material/GridView';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

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
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function PorfolioPosts() {
  const {authState: {porfolioUser: {image, username, firstname, lastname}}} = useContext(AuthContext)
  const {postState: {postsUser}, getPostsUser} = useContext(PostContext)
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

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
    <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
      <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
          centered
          textColor='inherit'
          TabIndicatorProps={{style: {background:'#262626', height: '1px', top: 0, bottom: 'none'}}}
          
      >
        <Tab icon={<GridViewIcon fontSize='small' />} {...a11yProps(0)} iconPosition="start" label="Bài viết" sx={{marginRight:{ xs: '30px', md: '60px'}, color: '#262626',fontSize: '12px', padding: 0, minHeight:{ xs: '36px', md: '55px'}}}/>
        <Tab icon={<BookmarkAddedIcon fontSize='small' />} {...a11yProps(1)} iconPosition="start" label="Đã lưu" sx={{marginRight:{ xs: '30px', md: '60px'},color: '#262626',fontSize: '12px',padding: 0, minHeight:{ xs: '36px', md: '55px'}}}/>
        <Tab icon={<AssignmentIndIcon fontSize='small' />} {...a11yProps(2)} iconPosition="start" label="Được gắn thẻ" sx={{color: '#262626',fontSize: '12px', padding: 0, minHeight:{ xs: '36px', md: '55px'}}} />
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
      <ImageList sx={{ width: '100%', overflowY: 'unset',height: 'auto', gap:{xs:'3px !important', md:'20px !important'} }} cols={3}>
        {
          postsUser && postsUser.map((post) => (
            <ImageListItem key={post.image.id} sx={{maxHeight: {xs: '100px', md: '252px'}}}>
              <img
                src={`${post.image.url}?w=252&h=252&fit=crop&auto=format`}
                srcSet={`${post.image.url}?w=252&h=252&fit=crop&auto=format&dpr=2 2x`}
                alt={post.title}
                loading="lazy"
                className='!max-h-full !h-full'
              />  
            </ImageListItem>
          ))
        }
      </ImageList>
    </TabPanel>
    <TabPanel value={value} index={1}>
      Developing....
    </TabPanel>
    <TabPanel value={value} index={2}>
      Developing....
    </TabPanel>
    </>

  )
}
