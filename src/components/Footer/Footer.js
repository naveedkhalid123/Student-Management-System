import React from 'react'

export default function Footer() {

    const year = new Date().getFullYear()
    return (
        <footer className='py-2 ' style={
            { background: "#0001529" }

        }>
            <div className='container d-flex justify-content-center'>
                <div className='row'>
                    <div className='col'>
                        <p className='mb-0 text-dark py-4' style={{color:"black"}}>&copy; {year}. All Rights Reserved</p>
                    </div>
                </div>
            </div>

        </footer>
    )
}
