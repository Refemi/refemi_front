import React from "react"
import { useHistory } from "react-router"

import Counter from "../../Counter"

import { AiFillPlusCircle } from "react-icons/ai"

export default function Header ({ currentUser, contributions, users, setShowNewRef }) {

  const history = useHistory()

  return (
    <div className="flex flex-column justify-around dashboard dashboard-content borders grey-bg-opacity-cat">
      <p>
        Bienvenue, {currentUser.name}&nbsp;
        <span
          className="pointer white-hover"
          onClick={ () => history.push('/auth/signout') }
        >
          (Déconnexion)
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

        {currentUser.role === 3 && (
          <div className="flex justify-around">
            <Counter
              label="contributeurs"
              value={users.totalContributors ? users.totalContributors : 0}
            />

            <Counter
              label="admins"
              value={users.nbOfAdmins ? users.nbOfAdmins : 0}
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