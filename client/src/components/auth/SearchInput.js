import React, { useRef, useState,useEffect, useCallback } from 'react'

import { Search, SearchIconWrapper,StyledInputBase } from '../../themes/styled';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { apiUrl } from '../../contexts/constants';
import debounce from 'lodash/debounce'
import { stringAvatar } from '../../utils/setMui';

import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

function useOutsideAlerter(ref,cb) {
    useEffect(() => {
        /**
       * Alert if clicked on outside of element
       */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                cb()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default function SearchInput() {
    const [visible, setVisible] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [dropdownOptions, setDropdownOptions] = useState([])

    const refInput = useRef(null)

    const debounceDropDown = useCallback(debounce((nextValue) => fetchDropdownOptions(nextValue), 1000), [])
    
    const handleChangeInput = (e) => {
        const {value} = e.target
        setSearchValue(value)
        debounceDropDown(value)
    }
    const openDropdown = (e) => {
        setVisible(true)
    }
    const closeDropdown = (e) => {
        setVisible(false)
    }
    const handleClickCloseDropdown = () => {
        setVisible(false)
        setSearchValue('')
        setDropdownOptions([])
    }
    useOutsideAlerter(refInput,closeDropdown);

    const fetchDropdownOptions = async (key) => {
        try {
            const res = await axios.get(`${apiUrl}/auth?name=${key}`)
            if(res.data.success){
                setDropdownOptions(res.data.users)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Search ref={refInput} className='!bg-[#efefef] !rounded-lg !relative flex items-center'>
        <SearchIconWrapper>
            <SearchIcon className='text-[#8e8e8e] font-light' />
        </SearchIconWrapper>
        <StyledInputBase
        
        placeholder="Tìm kiếm"
        inputProps={{ 'aria-label': 'search' }}
        className='!text-base'
        onChange={handleChangeInput}
        value={searchValue}
        onClick={openDropdown}
        />
        {
            visible && <div className={`${visible ? 'flex' : 'hidden'}flex-col max-h-[362px] absolute top-[129%] w-[375px] shadow-[#00000017] shadow-[0_0_5px_1px] bg-[#fff] pt-3 rounded-[6px] overflow-x-hidden overflow-y-auto`}>
            {
                
                dropdownOptions && dropdownOptions?.length !== 0 ?
                dropdownOptions.map(value => {
                        return <Link key={value.username} onClick={handleClickCloseDropdown} className='px-4 py-2 flex flex-[0_0_auto] items-center' to={`/${value.username}`}>
                            {value.image 
                                    ? <Avatar alt={value.firstname+' '+value.lastname} src={value.image.url} sx={{height:44,width:44}}/> 
                                    : <Avatar {...stringAvatar(value.firstname+' '+value.lastname)} sx={{height:44,width:44, fontSize: 24}}/>}
                            <div className='ml-3 flex-[1_1_auto]'>
                                <div className='text-sm font-semibold text-[#262626]'>{value.username}</div>
                                <div className='text-sm font-normal text-[#8e8e8e]'>{value.firstname+' '+value.lastname}</div>
                            </div>
                        </Link>
                    })
                : <div className='flex flex-col w-full flex-[1_1_auto] h-[350px]'>
                        <h4 className='font-semibold text-base text-[#262626] mx-4'>Gần đây</h4>
                        <div className='flex grow items-center justify-center text-[#8e8e8e] font-semibold text-sm'>Không có nội dung tìm kiếm mới đây.</div>
                    </div>
            }
            </div>
        }
    </Search>
  )
}
