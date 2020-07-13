import React, { useEffect, useState } from 'react'
import store from '../utils/store'

import './modal.css'

const Settings = ({ showModal, onClose, dateFormat, chatKeys, setChatKeys, setDateFormat }) => {
  const handleKeysRadioChange = (e) => {
    store.setItem('SChatKeys', e.target.value)
    setChatKeys(e.target.value)
  }
  const handleHoursRadioChange = (e) => {
    store.setItem('SChatDateFormat', e.target.value)
    setDateFormat(e.target.value)
  }

  const handleResetToDefaults = () => {
    store.setItem('SChatDateFormat', '24')
    store.setItem('SChatKeys', 'on')

    setDateFormat('24')
    setChatKeys('on')
  }

  return (<div id='settings_modal' className={showModal ? 'modal show' : 'modal'}>
    <div id='modal_mask' className='modal_mask' onClick={onClose}></div>
    <div className='content'>
        <div className='header'>
            <div className='header_text'>Chat settings</div>
            <button id='close_button' onClick={onClose}>&times;</button>
        </div>
        <div className='row'>
            <label>Clock display</label>
            <div className='actions'>
                <div className='input'>
                    <input id='hours24' type='radio' name='hours' value='24' onChange={handleHoursRadioChange} checked={dateFormat === '24'} />
                    <label htmlFor="hours24">24 hours</label>
                </div>
                <div className='input'>
                    <input id='hours12' type='radio' name='hours' value='12' onChange={handleHoursRadioChange} checked={dateFormat === '12'}/>
                    <label htmlFor="hours12">12 hours</label>
                </div>
            </div>
        </div>
        <div className='row'>
            <label>Send messages on Ctrl/Cmd + Enter</label>
            <div className='actions'>
                <div className='input'>
                    <input id='keysOn' type='radio' name='keys' value='on' onChange={handleKeysRadioChange} checked={chatKeys === 'on'} />
                    <label htmlFor="keysOn">On</label>
                </div>
                <div className='input'>
                    <input id='keysOff' type='radio' name='keys' value='off' onChange={handleKeysRadioChange} checked={chatKeys === 'off'} />
                    <label htmlFor="hours1">Off</label>
                </div>
            </div>
        </div>
        <button id='reset_button' onClick={handleResetToDefaults}>Reset to default</button>
    </div>
</div>)
}

export default Settings
