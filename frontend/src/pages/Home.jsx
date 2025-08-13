// import React from 'react'

// export default function Home() {
//   return (
//     <div>Home</div>
//   )
// }
import React,{useState, useEffect} from 'react';

export default function Home() {
  const [images, setImages]=useState([]);

  useEffect(()=>{
    const fetchImages= async()=>{
    try{
      const res=await fetch("https://picsum.photos/v2/list?limit=10")
    const data= await res.json()
      setImages(data);
    }
    catch(err){
      console.error("Error fetching images:", err);
    }
  };
      fetchImages();
    },[]);
  return (
    <div style={styles.container}>
      {images.map((img) => (
        <img
          key={img.id}
          src={`https://picsum.photos/id/${img.id}/500/300`}
          alt={img.author}
          style={styles.image}
        />
      ))}
    </div>
  );
}

// Simple styling
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px", // proportional vertical padding
    padding: "20px",
  },
  image: {
    width: "100%",
    height: "auto", // keep aspect ratio
    borderRadius: "8px",
  },
};
