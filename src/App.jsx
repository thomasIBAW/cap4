const initialIssues = [
    {
        id: 1,
        status: "new",
        owner:"Ravan", 
        effort: 5,
        created: new Date('2018-05-12'),
        due: undefined,
        title: "This is the first Issue in the List"
    },
    {
        id: 2,
        status: "new",
        owner:"Tom", 
        effort: 1,
        created: new Date('2018-05-10'),
        due: undefined,
        title: "This is the second Issue from my fantasy List"
    }
]


class HelloWorld extends React.Component {
    render() {
        const continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
        const helloContinents = Array.from(continents, c => `Hello ${c}!`);
        const message = helloContinents.join(' ');
        return (
            
            <div title='Outer div'>
                <h1>{message}</h1>
                <div>
                    {/* adding a second div is only possible if a div contains them all */}
                    <h2>TEST</h2>
                </div>
            </div>
    
        );
    }
}

class BorderWrap extends React.Component {
    render() {
        const borderStyle = {border: "1px solid green", padding:4};
        return (
            <div style = {borderStyle}>
                {this.props.children}
            </div>
        )
    }
}

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a Placeholder for the Issue filter.</div>
        );
    }
}

function IssueTable(props) {
        const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue}></IssueRow>)
        return (
            <table style= {{border: "1px solid red"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Due Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                   {issueRows}
                </tbody>
            </table>
        );
    }


// final
function IssueRow(props){
    const issue = props.issue;
     return (
                <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>{issue.due ? issue.due.toDateString() : ''}</td>
                <td>{issue.title}</td>
            </tr>
    );
}

class IssueAdd extends React.Component {

    constructor() {
        super();    
        this.handleSubmit = this.handleSubmit.bind(this)

    };

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = {
            owner: form.owner.value, title: form.title.value, status: "New",
        }
        this.props.createIssue(issue);
        form.owner.value = ""; form.title.value="";
    }

    render() {
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <button>Add Issue</button>

            </form>
        );
    }
}


class IssueList extends React.Component {

    constructor() {
        super();
        this.state = {issues: []};
        this.createIssue = this.createIssue.bind(this)
    }

    createIssue(issue) {
        issue.id= this.state.issues.length +1;
        issue.created = new Date();
        const newIssueList = this.state.issues.slice();
        newIssueList.push(issue);
        this.setState({issues: newIssueList})
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(()=> {
            this.setState({issues: initialIssues});

        }, 500)
    }

    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues ={this.state.issues} />
                <hr />
                <IssueAdd createIssue = {this.createIssue}/>

            </React.Fragment>
        );
    }
}

const element = <IssueList />;
ReactDOM.render(element, document.querySelector('#content'))
