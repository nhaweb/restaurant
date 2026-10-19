export const restaurantSettingsQuery = `*[_type == "restaurantSettings"][0]{
  name,
  legalName,
  tagline,
  description,
  shortDescription,
  cuisine,
  priceRange,
  address,
  phone,
  zalo,
  email,
  hours,
  social[]{ label, href },
  mapsQuery,
  copyright
}`;

export const menuCategoriesQuery = `*[_type == "menuCategory"] | order(sortOrder asc){
  "id": categoryId,
  label
}`;

export const menuItemsQuery = `*[_type == "menuItem"] | order(name asc){
  "id": itemId,
  name,
  description,
  price,
  calories,
  category,
  dietary,
  featured,
  image,
  imageUrl
}`;

export const productsQuery = `*[_type == "product"] | order(name asc){
  "id": productId,
  "slug": slug.current,
  name,
  description,
  price,
  compareAtPrice,
  image,
  imageUrl,
  gallery,
  category,
  tags,
  inStock,
  rating,
  reviewCount,
  onSale,
  featured
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0]{
  "id": productId,
  "slug": slug.current,
  name,
  description,
  price,
  compareAtPrice,
  image,
  imageUrl,
  gallery,
  category,
  tags,
  inStock,
  rating,
  reviewCount,
  onSale,
  featured
}`;

export const postsQuery = `*[_type == "post"] | order(date desc){
  "slug": slug.current,
  title,
  excerpt,
  date,
  dateLabel,
  comments,
  image,
  imageUrl,
  content
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  excerpt,
  date,
  dateLabel,
  comments,
  image,
  imageUrl,
  content
}`;

export const galleryImagesQuery = `*[_type == "galleryImage"] | order(sortOrder asc){
  "id": imageId,
  image,
  imageUrl,
  alt
}`;

export const teamMembersQuery = `*[_type == "teamMember"] | order(sortOrder asc){
  name,
  role,
  image,
  imageUrl
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(name asc){
  "id": testimonialId,
  name,
  role,
  quote,
  avatar,
  avatarUrl,
  highlight
}`;
