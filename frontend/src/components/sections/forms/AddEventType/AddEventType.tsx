import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../../assets/libs/validation/schema';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as eventTypesActions from '../../../../features/eventTypesSlice';
import { NewEventType } from '../../../../types/EventType';
import { handleCommonBlur } from '../../../../helpers/textManipulator';
import { AttachFile, TextArea, TextInput } from '../../../UI/inputs/fields';
import { MainButton } from '../../../UI/buttons';
import { Notification } from '../../../UX';
import './add-event-type.scss';

type Props = {
  relPage: string;
};

export const AddEventType: React.FC<Props> = ({ relPage }) => {
  const eventTypeSchema = yup.object({
    name: schema.messageRequired(255),
    description: schema.messageRequired(255),
    photo: schema.photo,
  });

  const dispatch = useAppDispatch();
  const { errorsAdding, isAdding, isAddSuccess } = useAppSelector(
    state => state.eventTypes,
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
    trigger,
  } = useForm<NewEventType>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      description: '',
      photo: undefined,
    },
    resolver: yupResolver<NewEventType>(eventTypeSchema),
  });

  const onSubmit: SubmitHandler<NewEventType> = async (data: NewEventType) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    await dispatch(eventTypesActions.add(formData));

    reset();
  };

  return (
    <section className={`${relPage}__add-event-type add-event-type`}>
      <h2 className="add-event-type__title">Бажаєте додати послугу?</h2>

      <form
        className="add-event-type__form"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <TextInput
          type="text"
          label="Дайте назву послузі"
          placeholder="Назва"
          isRequired
          error={errors.name?.message}
          register={{
            ...register('name', {
              onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('name', handleCommonBlur(event.target.value));
                trigger('name');
              },
            }),
          }}
        />

        <TextArea
          label="Опис нашої послуги"
          rows={5}
          placeholder="Опис"
          isRequired
          error={errors.description?.message}
          register={{
            ...register('description', {
              onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('description', handleCommonBlur(event.target.value));
              },
            }),
          }}
        />

        <Controller
          control={control}
          name="photo"
          render={({ field: { value, onChange } }) => {
            return (
              <AttachFile
                label="Оберіть фото послуги"
                error={errors.photo?.message}
                value={value?.name}
                isRequired
                onAttach={value => {
                  onChange(value);
                  trigger('photo');
                }}
              />
            );
          }}
        />

        <MainButton
          type="submit"
          className="add-event-type__button"
          text="Опублікувати"
          isLoading={isAdding}
        />
      </form>

      {isAddSuccess && (
        <Notification
          className="add-event-type__notification"
          message={'Ваша послуга опублікована.'}
          onClose={() => dispatch(eventTypesActions.clearAddData())}
        />
      )}

      {errorsAdding && (
        <Notification
          className="add-event-type__notification"
          message="Послуга не була опублікована."
          errors={errorsAdding}
          onClose={() => dispatch(eventTypesActions.clearAddData())}
        />
      )}
    </section>
  );
};
