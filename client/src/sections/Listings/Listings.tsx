import React from "react";
import { useQuery, useMutation } from "react-apollo";
// import { ListingsData, DeleteListing, DeleteListingVariables, Listing } from './types';
import { Listings as ListingsData } from '../Listings/__generated__/Listings'
import { DeleteListing, DeleteListingVariables } from '../Listings/__generated__/DeleteListing'
import { gql } from 'apollo-boost';
import { List, Button, Avatar, Spin, Alert } from "antd";
// ListingsSkeleton
import './styles/Listings.css'
import { ListingsSkeleton } from './components';


const LISTINGS = gql`
query Listings{
  listings{
    id
    title
    image
    address
    price
    numOfGuests
    numOfBeds
    numOfBaths
    rating
  }
}
`
const DELETE_LISTING = gql`
mutation DeleteListing($id: ID!) {
  deleteListing(id: $id){
    id
    title
  }
}
`
interface Props {
  title: string
}




export const Listings = ({ title }: Props) => {

  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS)
  const [deleteListing, { loading: deleteListingLoading, error: deleteListingError }] = useMutation<DeleteListing, DeleteListingVariables>(
    DELETE_LISTING
  )
  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } })
    refetch()

    console.log('data:', data)

  }

  const listUi = data ? (
    <List
      itemLayout="horizontal"
      dataSource={data.listings}
      renderItem={listing => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => handleDeleteListing(listing.id)}
            >
              Delete
            </Button>
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape="square" size={48} />}
          />
        </List.Item>
      )}
    />
  ) : null;
 

  if (loading) {
    return <div className='listings'>

      <ListingsSkeleton title={title} />
    </div>

  }

  const deleteListingErrorAlert = deleteListingError ? (
    <Alert
      type="error"
      message="Uh oh! Something went wrong :(. Please try again later."
      className="listings__alert"
    />
  ) : null;
  if (error) {
    return <div className='listings'>

      <ListingsSkeleton title={title} error />
    </div>
  }
  return <div className='listings'>
    <Spin spinning={deleteListingLoading}>
      {deleteListingErrorAlert}
      <h1>{title}</h1>
      {listUi}
      {/* {deleteListingLoading && <h2>Deleting files</h2>} */}
      {/* {deleteListingError && <h2>Something wrong with deleting files..try again</h2>} */}
    </Spin>


  </div>
}