import {React,useEffect, useState} from 'react'

function SongDetails({songdetails,setActiveSong}) {
  const [logoImg,setLogoImg] = useState(null);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`https://cms.samespace.com/assets/${songdetails.cover}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.blob();
        const imgUrl = URL.createObjectURL(res);
        // const img = res.data;
        setLogoImg(imgUrl);
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    };
    fetchImages();

  }, [songdetails]);
  return (
    <div className='songDetails' onClick={()=>{setActiveSong(songdetails)}}>
    <div className='songLogo'>
      <img className='songimageLogo' src ={logoImg ? logoImg : songdetails.cover} alt ={songdetails.name[0]} />
    </div>
    <div>
      <div className='songNameFont'>{songdetails.name}</div>
      <div className='songArtistFont'>{songdetails.artist}</div>
    </div>
    <div className='duration'>
      4:01
    </div>
    </div>
      // {item.artist} 
  )
}

export default SongDetails