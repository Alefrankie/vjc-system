function UserHeader (): React.ReactElement {
  return (
    <>
      <div
        className='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'
        style={{
          minHeight: '600px',
          backgroundImage: 'url(/img/theme/profile-cover.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      >
        {/* Mask */}
        <span className='mask bg-gradient-default opacity-8' />
        {/* Header container */}
        <div className='d-flex align-items-center'>
          <div>
            <div>
              <h1 className='display-2 text-white'>Hello Jesse</h1>
              <p className='text-white mt-0 mb-5'>
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
              <button onClick={e => e.preventDefault()}>Edit profile</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserHeader
