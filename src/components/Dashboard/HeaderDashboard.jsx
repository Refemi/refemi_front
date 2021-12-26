import React from "react"

export default function Header (
  userName = '',
  userRole = 0,
  contributionValidated = 0,
  contributionPendings = 0,
  totalContributors = 0,
  totalAdmin = 0
) {

  return (
    <div className="flex flex-column justify-around dashboard dashboard-content borders grey-bg-opacity-cat">
      <p>
        Bienvenue, {userName}&nbsp;
        <span
          className="pointer white-hover"
          onClick={ () => history.push('/auth/signout') }
        >
          Déconnexion
        </span>
      </p>

      <div className="flex justify-between">
        <Counter
          label="contributions validées"
          value={contributions.validated}
          className="white-bg"
        />

        <Counter
          label="contributions en attente"
          value={contributions.pending}
        />

        {userRole === 3 && (
          <div className="flex justify-around">
            <Counter
              label="contributeurs"
              value={
                allUsers.nbOfContributors ? allUsers.nbOfContributors : 0
              }
            />

            <Counter
              label="admins"
              value={allUsers.nbOfAdmins ? allUsers.nbOfAdmins : 0}
            />
          </div>
        )}

        <div className="box justify-center align-center">
          <AiFillPlusCircle
            onClick={ () => setShowNewRef(true) }
            size={32}
            className="pointer"
          />
        </div>
      </div>
    </div>
  )
}