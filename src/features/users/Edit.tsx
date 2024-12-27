import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
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
import { editUserFx } from '@/features/users/data/api'
import { userInputOutput } from '@/features/users/data/input-output'
import { useYupSchemaUsers } from '@/features/users/data/service'
import { type User } from '@/features/users/data/types'
import SameFields from '@/features/users/SameFields'

export default function Edit({
  handleEditClose,
  initialValues,
}: {
  handleEditClose: () => void
  initialValues: User
}) {
  const [editUser, loading] = useUnit([editUserFx, editUserFx.pending])

  const { t } = useTranslation()
  const schema = useYupSchemaUsers()

  const handleCreateSuccess = () => {
    handleEditClose()
  }

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          zIndex: 2000,
        }}
      >
        <IconButton onClick={handleEditClose} size="small" color={'primary'}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogTitle
        sx={{
          px: { xs: 1, md: 2 },
          pt: 2,
          pb: 0,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t('Edit')}
        </Typography>
      </DialogTitle>
      <Formik
        initialValues={userInputOutput.getInitialValues(initialValues)}
        validationSchema={object().shape(schema)}
        onSubmit={async (
          { submit: _submit, ...restValues },
          { resetForm, setErrors },
        ) => {
          try {
            await editUser({
              data: userInputOutput.formatValues(restValues),
              id: initialValues.id,
            })

            resetForm()
            handleCreateSuccess()
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
        }) => (
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
              buttonTitle={t('Edit')}
            />
          </form>
        )}
      </Formik>
    </>
  )
}
