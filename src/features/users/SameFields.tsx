import { type ChangeEvent, type FocusEvent } from 'react'
import { type FormikErrors, type FormikTouched } from 'formik'
import { useTranslation } from 'react-i18next'
import OutlinedInputEl from '@/components/DataInputs/OutlinedInputEl'
import { LineWrapper } from '@/components/StyledComponents/FormsBackgroundAndLine'
import { UserFields } from '@/features/users/data/input-output.ts'

export default function SameFields({
  touched,
  errors,
  values,
  handleChange,
  handleBlur,
}: {
  touched: FormikTouched<UserFields>
  errors: FormikErrors<UserFields>
  values: UserFields
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (
    e: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLDivElement,
      Element
    >,
  ) => void
}) {
  const { t } = useTranslation()

  return (
    <>
      <LineWrapper
        title={t('Name')}
        sx={{ gridTemplateColumns: '70px 1fr' }}
        required
      >
        <OutlinedInputEl
          touched={touched.name}
          error={errors.name}
          label={t('Name')}
          name={'name'}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.name}
          required
          size={'small'}
        />
      </LineWrapper>

      <LineWrapper
        title={t('userName')}
        sx={{ gridTemplateColumns: '70px 1fr' }}
        required
      >
        <OutlinedInputEl
          touched={touched.userName}
          error={errors.userName}
          label={t('userName')}
          name={'userName'}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.userName}
          required
          size={'small'}
        />
      </LineWrapper>

      <LineWrapper title={t('Email')} sx={{ gridTemplateColumns: '70px 1fr' }}>
        <OutlinedInputEl
          touched={touched.email}
          error={errors.email}
          label={t('Email')}
          name={'email'}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.email}
          size={'small'}
        />
      </LineWrapper>

      {/* phone */}

      <LineWrapper
        title={t('Website')}
        sx={{ gridTemplateColumns: '70px 1fr' }}
      >
        <OutlinedInputEl
          touched={touched.website}
          error={errors.website}
          label={t('Website')}
          name={'website'}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.website}
          size={'small'}
        />
      </LineWrapper>

      <LineWrapper title={t('Street')} sx={{ gridTemplateColumns: '70px 1fr' }}>
        <OutlinedInputEl
          touched={touched.street}
          error={errors.street}
          label={t('Street')}
          name={'street'}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.street}
          size={'small'}
        />
      </LineWrapper>

      <LineWrapper title={t('Suite')} sx={{ gridTemplateColumns: '70px 1fr' }}>
        <OutlinedInputEl
          touched={touched.suite}
          error={errors.suite}
          label={t('Suite')}
          name={'suite'}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.suite}
          size={'small'}
        />
      </LineWrapper>
      <LineWrapper title={t('City')} sx={{ gridTemplateColumns: '70px 1fr' }}>
        <OutlinedInputEl
          touched={touched.city}
          error={errors.city}
          label={t('City')}
          name={'city'}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.city}
          size={'small'}
        />
      </LineWrapper>
      <LineWrapper
        title={t('ZipCode')}
        sx={{ gridTemplateColumns: '70px 1fr' }}
      >
        <OutlinedInputEl
          touched={touched.zipcode}
          error={errors.zipcode}
          label={t('ZipCode')}
          name={'zipcode'}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.zipcode}
          size={'small'}
        />
      </LineWrapper>
      <LineWrapper
        title={t('companyName')}
        sx={{ gridTemplateColumns: '70px 1fr' }}
      >
        <OutlinedInputEl
          touched={touched.companyName}
          error={errors.companyName}
          label={t('companyName')}
          name={'companyName'}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.companyName}
          size={'small'}
        />
      </LineWrapper>
    </>
  )
}
