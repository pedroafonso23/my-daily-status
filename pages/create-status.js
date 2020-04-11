import React, { useState } from 'react'
import auth0 from '../lib/auth0'
import axios from 'axios'

const CreateStatus = () => {
    const [dados, setDatos] = useState({
        status: 'well',
        coords: {
            lat: null,
            long: null
        }
    })
    const getMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setDatos(old => {
                    return {
                        ...old,
                        coords: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        }
                    }
                })
            })
        }
    }

    const onStatusChange = evt => {
        const value = evt.target.value
        setDatos(old => {
            return {
                ...old,
                status: value
            }
        })
    }

    const save = async () => {
        await axios.post('/api/save-status', dados)
    }

    return (
        <div>
            <h1>Create Status</h1>
            <label className='block'><input type="radio" name='status' value='well' onClick={onStatusChange}/>I am fine and with no symptoms.</label>
            <label className='block'><input type="radio" name='status' value='flu' onClick={onStatusChange}/>I have flu / cold symptoms.</label>
            <label className='block'><input type="radio" name='status' value='covid' onClick={onStatusChange}/>I have COVID-19 symptoms.</label>
            Your current position: {JSON.stringify(dados)}
            <button onClick={getMyLocation}>Get my location</button>
            <button onClick={save}>Save my status</button>
        </div>
    ) 
}

export default CreateStatus

export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)
    if (session) {
        return {
            props: {
                isAuth: true,
                user: session.user,
            }
        }
    }
    return {
        props: {
            isAuth: false,
            user: {}
        }

    }  
}