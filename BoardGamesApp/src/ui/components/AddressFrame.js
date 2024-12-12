const AddressFrame = ({ street_name, street_number, apartament_number, city }) => {
    const api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    return (
        <>
        {apartament_number ?
            <iframe
                title='address'
                className='address rounded align-self-center'
                frameBorder="0"
                src={`https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${street_name}+${street_number},${city}&zoom=12'`} allowFullScreen>
            </iframe>
            :
            <iframe
                title='address'
                className='address rounded align-self-center'
                frameBorder="0"
                src={`https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${street_name}+${street_number}/${apartament_number},${city}&zoom=12'`} allowFullScreen>
            </iframe>
        }
        </>
        
    )
};

export default AddressFrame;