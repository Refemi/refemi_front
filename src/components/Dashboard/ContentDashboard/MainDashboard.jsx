import React from 'react'

// COMPONENT
export default function MainDashboard({ currentUser, contributions }) {
    return (
      <div className="dashboard dashboard-content borders">
        <div className="margin-bottom">
          {currentUser.role === "contributor" &&
            currentUser.validatedContributions.length > 0 && (
              <div>
                <p className="dashboard-title">
                  Contributions validées :
                </p>
                {currentUser.validatedContributions.map(
                  (contribution, index) => (
                    <div key={index}>{contribution}</div>
                  )
                )}
                <hr className="margin7" />
              </div>
            )}
        </div>

        <div>
          {currentUser.role === "contributor" &&
            currentUser.pendingContributions.length > 0 && (
              <div>
                {contributions.pending === 0 && contributions.validated === 0
                  ? <p className="dashboard-title">
                    Vous n'avez publié aucune contribution
                  </p>
                  : <p className="dashboard-title">
                    Contributions en attente de validation :
                  </p>
                }
                {currentUser.pendingContributions.map((contribution, index) =>
                  <div key={index}>{contribution}</div>
                )}
                <hr className="margin7" />
              </div>
            )}
          <div>
            <p className="dashboard-title">Contributions validées :</p>
            {/* Ici récupérer la liste de toutes les contributions des contributeurs en attente de validation */}
          </div>
        </div>
      </div>
    )
}