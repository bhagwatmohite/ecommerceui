

const ForgotPassword = () => {
  return (
    <>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-7 col-xl-6">
              <div className="card mx-4">
                <div className="card-body p-4">
                  <form>
                    <h1>Forgot Password</h1>
                    <p className="text-body-secondary">Enter your email to reset your password</p>

                    <div className="mb-3 input-group">
                      <span className="input-group-text">@</span>
                      <input type="email" className="form-control" placeholder="Email" autoComplete="email" />
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">Reset Password</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword