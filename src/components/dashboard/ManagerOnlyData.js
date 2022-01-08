

export const ManagerOnlyData = () => {
    const { user } = useContext(UserContext);
    const { role } = user;

    return (
        <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                {role == 'STAFF' ? 'staff' : 'admin'}
            </div>
        </div>
    );
}
