import CloseIcon from '@mui/icons-material/Close'
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { object } from 'yup'
import DialogActionsEl from '@/components/DialogActionsEl'
import { BackgroundBox } from '@/components/StyledComponents/FormsBackgroundAndLine'
import { addUserFx } from '@/features/users/data/api'
import { userInputOutput } from '@/features/users/data/input-output'
import { useYupSchemaUsers } from '@/features/users/data/service'
import SameFields from '@/features/users/SameFields'

export default function Create() {
  const [addUser, loading] = useUnit([addUserFx, addUserFx.pending])

  const { t } = useTranslation()
  const schema = useYupSchemaUsers()

  const handleClose = () => null

  return (
    <>
      <IconButton
        sx={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          zIndex: 2000,
        }}
        onClick={handleClose}
        size="small"
        color={'primary'}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle
        sx={{
          px: { xs: 1, md: 2 },
          pt: 2,
          pb: 0,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t('Create')}
        </Typography>
      </DialogTitle>
      <Formik
        initialValues={userInputOutput.emptyInitialValues}
        validationSchema={object().shape(schema)}
        onSubmit={async (
          { submit: _, ...restValues },
          { resetForm, setErrors },
        ) => {
          try {
            await addUser(userInputOutput.formatValues(restValues))

            resetForm()
            handleClose()
          } catch (err) {
            if (err instanceof Error) {
              setErrors({
                submit: err.message,
              })
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <DialogContent
                sx={{
                  px: { xs: 1, md: 2 },
                  py: 1,
                }}
              >
                <BackgroundBox gap={'0.75rem'}>
                  <SameFields
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </BackgroundBox>
              </DialogContent>
              <DialogActionsEl
                submit={errors.submit}
                isSubmitting={loading}
                buttonTitle={t('Create')}
              />
            </form>
          )
        }}
      </Formik>
    </>
  )
}
