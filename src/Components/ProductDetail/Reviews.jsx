import { Avatar, Button, Rate } from 'antd'
import React, { useState } from 'react'
import { FieldContainer, Label, TextArea } from '../../Utils/common'
import moment from 'moment'
import { useMutation, useQueryClient } from 'react-query'
import { rateProducApi } from '../../apis/products'
import { sendNotif } from '../../Utils/notif'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HiOutlineUser } from 'react-icons/hi'

const Reviews = ({ratings}) => {
    const queryClient = useQueryClient();
    const params = useParams();
    const history = useHistory();
    const [rate, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { data: currUser } = useSelector(({ users: { currUser } }) =>currUser);
    const rateMutaion = useMutation(() => rateProducApi(params.id, {value: rate, comment}), {
        onSuccess: (data) => {
            setRating(0);
            setComment('');
            sendNotif(data.message, 'success');
            queryClient.invalidateQueries();
        },
        onError: (err) => {
            const { status } = err?.response;
            if(status === 401){
                queryClient.invalidateQueries();
                history.push({ pathname: '/login', state: { from: history.location.pathname } });
                sendNotif("Vous devez vous connecter pour noter ce produit", 'warn')
            }else{
                const { message } = err?.response?.data;
                sendNotif(message || 'Quelque chose s\'est mal passée', 'error');
            }
        }
    });
    const alreadyRated = ratings?.ratings?.find(r => r.User.id === currUser.id);
  return (
    <div className="reviews">
        {
            ratings?.ratings?.map((rat, index) => (
                <div className="review" key={index}>
                    <div className="user">
                        <div className="avatar">
                            <Avatar size={50} >
                            {rat?.User.cover ? 
                                <img src={rat?.User.cover} alt="avatar" srcset="" />:
                                <HiOutlineUser className='icon' />
                            }
                            </Avatar>
                        </div>
                        <div className="left">
                            <div className="name">{ rat?.User.id === currUser.id ? 'Moi': rat.User?.fullname}</div>
                            <Rate disabled value={rat.value} className='rate' /> <span className="value">{rat.value}</span>
                            <span className="date"> {moment(rat.createdAt).fromNow()} </span>
                        </div>
                    </div>
                    <div className="comment"> {rat.comment} </div>
                </div>
            ))
        }
        {
            alreadyRated ? null :
            <>
            <div className="title">Noter ce produit</div>
            <div className="form">
                <FieldContainer>
                    <Label> Votre note </Label>
                    <Rate className='rate' value={rate} onChange={(value) => setRating(value)} />
                </FieldContainer>
                <FieldContainer>
                    <Label> Votre avis </Label>
                    <TextArea value={comment} onChange={(e) => setComment(e.target.value)} />
                </FieldContainer>
                <Button className='btn rate' loading={rateMutaion.isLoading} disabled={!comment || !rate} onClick={() =>rateMutaion.mutate()}>Soumettre</Button>
            </div>
            </>
        }
    </div>
  )
}

export default Reviews