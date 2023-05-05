// api.js
const getGeneralContent = async ({ id }) => {
  const options = {
    method: "GET",
    headers: { accept: "application/json; charset=utf-8" },
  };

  const response = await fetch(
    `http://54.221.169.56:3005/api/general-content/get-general-content/${id}`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch general content");
  }

  const data = await response.json();
  return data;
};

export default getGeneralContent;

// function GeneralContent() {
//     const options = {
//       method: "GET",
//       headers: { accept: "application/json; charset=utf-8" },
//     };

//     return fetch(
//       "http://54.221.169.56:3005/api/general-content/get-general-content/644a1cc24c46bea6cba59547",
//       options
//     )
//       .then((response) => response.json())
//       .then((data) => console.log("data", data))
//       .catch((error) => console.error(error));
//   }

//   export default GeneralContent;

// {
//     "generalContentObj": {
//         "_id": "644a1cc24c46bea6cba59547",
//         "media": {
//             "_id": "644a1cc24c46bea6cba59545",
//             "title": "anime",
//             "description": "zainab ",
//             "duration": 0,
//             "default_language": "english",
//             "release_year": "2023-03-31T00:00:00.000Z",
//             "media_id": "fyTDx6QV",
//             "subtitles": [],
//             "audio_tracks": [],
//             "jw_tags": [
//                 "action"
//             ],
//             "seo_tags": [
//                 "cartoon"
//             ],
//             "translated_content": [
//                 {
//                     "_id": "644a1cc24c46bea6cba59543",
//                     "title_translated": "anime",
//                     "description_translated": "zainab ",
//                     "language_type": "english",
//                     "language_code": "en",
//                     "__v": 0
//                 }
//             ],
//             "rating": 0,
//             "monetization": true,
//             "createdAt": "2023-04-26T13:25:30.604Z",
//             "__v": 0
//         },
//         "category": "movie",
//         "genre": [
//             {
//                 "genre_image": {
//                     "url": "https://res.cloudinary.com/techon/image/upload/v1682417164/genre/mnswhoeiukyrjjjf0skq.png",
//                     "public_id": "genre/mnswhoeiukyrjjjf0skq"
//                 },
//                 "_id": "6447a60d11d6f2e4e0d257de",
//                 "name": "thriill12",
//                 "genre_type": "movies",
//                 "is_enabled": true,
//                 "createdAt": "2023-04-25T06:34:34.689Z",
//                 "__v": 0
//             }
//         ],
//         "status": "true",
//         "thumbnail": {
//             "_id": "644a1cc24c46bea6cba59541",
//             "thumbnail_id": "",
//             "static_thumbnail_url": "https://res.cloudinary.com/techon/image/upload/v1682931115/thumbnails/nldirrcpkeou8wgdvzyo.jpg",
//             "motion_thumbnail_url": "",
//             "banner_thumbnail_url": "https://res.cloudinary.com/techon/image/upload/v1682931115/thumbnails/nldirrcpkeou8wgdvzyo.jpg",
//             "trailer_motion_url": "",
//             "thumbnail_type": "cloudinary",
//             "cloudinary_public_id": "thumbnails/nldirrcpkeou8wgdvzyo",
//             "createdAt": "2023-04-26T13:25:30.612Z",
//             "__v": 0,
//             "general_content": "644a1cc24c46bea6cba59547"
//         },
//         "rating": 0,
//         "comments": [],
//         "total_likes": 0,
//         "content_type": "free",
//         "availability": "released",
//         "createdAt": "2023-04-26T13:25:30.590Z",
//         "crew_members": [],
//         "__v": 0
//     }
// }
