import styled from "styled-components";
import { Input } from "../Input";
import useForm from "../../../hooks/useForm";
import { InputLabel } from "../../moecules/InputLabel";
import { Button } from "../Button";
import { useState } from "react";
import TagForm from "../../Organisms/TagForm";
import { api } from "../../../util/api";
import TagButton from "../Tag/TagButton";

const RoomFormContainer = styled.div`

`;

const RadioContainer = styled.div`
  font-size: 0.8rem;

  [type="radio"]{
    vertical-align: middle;
    appearance: none;
    border: 0.08rem solid gray;
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;

  }

  [type="radio"]:checked {
  border: 0.4em solid #4FAFB1;
  }
  
  [type="radio"]:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) dotted tomato;
  }

`;

const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  gap: 1.5rem;

  font-family: Noto Sans KR;

  button {
    margin-top: 20px;
  }
`
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #D3D3D3;
  border-radius: 0.2rem;
  padding: 0.5rem;
  gap: 0.5rem;
  min-height: 2.3rem;
  
`
const InputTitle = styled.div`
  display: flex;
  justify-content: space-between;

  span{
    color:#4D5358;
    font-size:0.8rem;
    font-weight: 500;
    margin-bottom: 0.7rem;
  }

  div{
    color:#4D5358;
    font-size: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #D3D3D3;
    border-radius: 0.2rem;
    cursor: pointer;
  }

  
`

export type RoomData = {
  is_private: boolean;
  member_max_count: number;
  tags: string[];
  title: string;
  info: string;
  image_url: string;
  password: string;
};

export type RoomFormProps = {
  isLoading: boolean;
  onSubmit: (value: RoomData) => void;
};

const RoomForm = (props: RoomFormProps) => {

  const [isPrivate, setIsPrivate] = useState(false);

  const handleChange2 = (event:any) => {
    setIsPrivate(event.target.value === 'private');
  };


  // 태그 폼 열고 닫기 버튼
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // 태그 폼 열기 
  const ChangeIsPopupOpen = (event:any) => {
    event.preventDefault()
    setIsPopupOpen(!isPopupOpen)
  }

  // 생성 폼의 태그 관리 state
  const [tags, setTags] = useState<string[]>([]);

  const { data, errors, handleChange, handleSubmit } = useForm<RoomData>({
    validations: {
      title: {
        required: {
          value: true,
          message: '방 제목은 필수입력 항목입니다.',
        },
      },
      info: {
        required: {
          value: true,
          message: '방 소개는 필수입력 항목입니다.',
        },
      },
      image_url: {
        required: {
          value: true,
          message: '대표 이미지는 필수입력 항목입니다.',
        },
      },
      member_max_count: {
        required: {
          value: true,
          message: '인원 수는 필수입력 항목입니다.',
        },
      },
      password: {
        required: {
          value: isPrivate,
          message: '패스워드는 필수입력 항목입니다.',
        },
      },

    },
    onSubmit: handleSubmitFormHook,
  });

  // 방 만들기 전송
  function handleSubmitFormHook() {
    console.log('안돼나?')    
    const subData = {
      ...data,
      is_private: isPrivate,
      member_max_count: Number(data.member_max_count),
      tags: tags,
    };
    console.log(subData)    
    props.onSubmit(subData);
  }

  return (
    <RoomFormContainer>
      <TagForm isPopupOpen={isPopupOpen} ChangeisPopupOpen={ChangeIsPopupOpen} setTags={setTags}/>
      <ContainerForm onSubmit={handleSubmit}>
        <InputLabel
          label="방 제목"
          onChange={handleChange('title')}
          placeholder="방의 이름을 입력해주세요."
          errorMessage={errors.title}
          isValid={errors.title ? false : true}
        />
        <InputLabel
          label="방 소개"
          onChange={handleChange('info')}
          placeholder="방 소개를 입력해주세요."
          errorMessage={errors.info}
          isValid={errors.info ? false : true}
        />
        <InputLabel
          label="대표 이미지"
          onChange={handleChange('image_url')}
          placeholder="대표 이미지를 설정해 주세요."
          errorMessage={errors.image_url}
          isValid={errors.image_url ? false : true}
        />
        <InputLabel
          type="number"
          label="인원 수"
          onChange={handleChange('member_max_count')}
          placeholder="인원수를 입력해 주세요"
          errorMessage={errors.member_max_count}
          isValid={errors.member_max_count ? false : true}
        />

        <RadioContainer>

          <InputTitle>
            <span>공개여부</span>
          </InputTitle>

          <div>
            <label>
              <input
                type="radio"
                name="privacy"
                value="public"
                checked={!isPrivate}
                onChange={handleChange2}
              />
              공개
            </label>
            <label>
              <input
                type="radio"
                name="privacy"
                value="private"
                checked={isPrivate}
                onChange={handleChange2}
              />
              비공개
            </label>
          </div>
        </RadioContainer>

        {isPrivate && <InputLabel
          type="password"
          label="비밀번호"
          onChange={handleChange('password')}
          placeholder="영문, 숫자 8자이상의 비밀번호를 입력해주세요."
          errorMessage={errors.password}
          isValid={errors.password ? false : true}
        />} 
      

        <InputTitle>
          <span>태그</span>
          <div onClick={ChangeIsPopupOpen}>태그 수정하기</div>
        </InputTitle>

        <TagsContainer>
          {tags.map((el,idx) => <TagButton key={idx} fontSize={0.8} bg="#e3f7f7" content={el}></TagButton>)}
        </TagsContainer>

        <Button fillColor isLoading={props.isLoading}>
          방 만들기
        </Button>

      </ContainerForm>
    </RoomFormContainer>
  );
}

export default RoomForm;
