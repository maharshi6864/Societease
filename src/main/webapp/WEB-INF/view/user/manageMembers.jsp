<%@ page contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8"/>
    <meta name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <title>Admin | Member Details</title>
    <!-- base:css -->
    <link rel="stylesheet"
          href="<%=request.getContextPath()%>/adminResources/css/materialdesignicons.min.css"/>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/adminResources/css/vendor.bundle.base.css"/>
    <!-- endinject -->
    <!-- plugin css for this page -->
    <link rel="stylesheet"
          href="<%=request.getContextPath()%>/adminResources/css/dataTables.bootstrap4.css"/>
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/adminResources/css/style.css"/>
    <!-- endinject -->
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/adminResources/image/favicon.png"/>
</head>

<body>
<div class="container-scroller">
    <!-- partial:partials/_navbar.html -->

    <jsp:include page="../user/header.jsp"/>

    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
        <!-- partial:partials/_sidebar.html -->

        <jsp:include page="../user/menu.jsp"/>

        <%-- <%@taglib prefix="f" uri="http://www.springframework.org/tags/form"
    %>--%>
        <%--        Member Edit Model Start--%>

        <div
                class="modal fade"
                id="exampleModal-edit"
                tabindex="-1"
                role="dialog"
                aria-labelledby="ModalLabel"
                aria-hidden="true"

        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabelEdit">Edit Member</h5>
                        <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onclick="emptyEditForm()"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="updateMember" method="post">
                            <div class=" row">
                                <div class="col-lg-12">
                                    <label for="member-name" class="col-form-label"
                                    >Member Name :
                                    </label>

                                    <input
                                            type="hidden"
                                            class="form-control"
                                            id="member-id"
                                            name="memberId"
                                    />

                                    <input
                                            type="text"
                                            class="form-control"
                                            id="member-name"
                                            name="memberName"
                                    />
                                </div>
                            </div>
                            <div class=" row">
                                <div class="col-lg-12">
                                    <label for="member-phone" class="col-form-label"
                                    >Member Phone No:
                                    </label>

                                    <input
                                            type="text"
                                            class="form-control"
                                            id="member-phone"
                                            name="memberPhone"
                                    />
                                </div>
                            </div>
                            <div class=" row">
                                <div class="col-lg-12">
                                    <label for="member-email" class="col-form-label"
                                    >Member Email Address:
                                    </label>

                                    <input
                                            type="text"
                                            class="form-control"
                                            id="member-email"
                                            name="memberEmail"
                                    />
                                </div>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary"
                                type="submit"
                        >Update
                        </button>
                        <button
                                type="button"
                                class="btn btn-light"
                                data-dismiss="modal"
                                onclick="emptyForm()"
                        >
                            Close
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>

        <%--        Member edit Model End--%>


        <%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>

        <!-- Modal starts -->

        <div class="modal fade" id="exampleModal-3" tabindex="-1"
             role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content ">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">Add Members</h5>
                        <button type="button" class="close" data-dismiss="modal"
                                aria-label="Close" onclick="emptyForm()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body ">
                        <form method="post" action="saveMembers" enctype="multipart/form-data">
                            <div class="row">
                                <div class="col-lg-4">
                                    <label class="col-form-label" for="member-form-name">Member Name : </label>
                                </div>
                                <div class="col-lg-3">
                                    <label class="col-form-label" for="member-form-phone">Member PhoneNo: </label>
                                </div>
                                <div class="col-lg-3 mb-1">
                                    <label class="col-form-label" for="member-form-email">Member Email Address: </label>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-lg-4 ">
                                    <input class="form-control" placeholder="Type Member Name" id="member-form-name"/>
                                </div>
                                <div class="col-lg-3 ">
                                    <input
                                            class="form-control" placeholder="Type Member Phone"
                                            id="member-form-phone"/>
                                </div>

                                <div class="col-lg-4">
                                    <input
                                            class="form-control" placeholder="Type Member Email Address"
                                            id="member-form-email"/>
                                </div>
                                <div class="col-lg-1 ">
                                    <button class="btn btn-primary" type="button"
                                            id="submit" onclick="addMemberToTable()">Add
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12" style="height:220px;max-height: 250px">
                                    <div class="table-responsive"
                                         style=" max-height: 100% !important;scrollbar-width: none">
                                        <table class="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th>Sr.No</th>
                                                <th>Member Name</th>
                                                <th>Member Phone No</th>
                                                <th>Member Email Address</th>
                                                <th>Member Photo Image File</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody id="member-table">
                                            <tr>
                                                <td colspan="6" style="text-align: center; padding: 80px 0px">
                                                    - -
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="house-numbers-label"></div>
                            <div class="row">
                                <div class="col-lg-12" id="house-numbers-ownwers"></div>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" type="submit"
                                id="submit-model">Submit
                        </button>
                        <button type="button" class="btn btn-light" data-dismiss="modal"
                                onclick="emptyForm()">Close
                        </button>
                    </div>
                </div>
                </form>
            </div>
        </div>

        <!-- Modal Ends -->

        <!-- partial -->

        <div class="main-panel">
            <div class="content-wrapper">
                <h3 class="main-title">Member Details</h3>
                <div class="d-flex justify-content-between align-content-center"
                     style="margin-bottom: 20px">
                    <nav aria-label="breadcrumb d-flex align-content-center"
                         class="bread">
                        <ol class="breadcrumb border-0 p-0 d-flex align-content-center">
                            <li class="breadcrumb-item"><a href="index">Dashboard</a></li>
                            <li class="breadcrumb-item active" aria-current="page">
                                Manage Members
                            </li>
                        </ol>
                    </nav>
                    <button type="button" class="btn btn-primary btn-sm"
                            data-toggle="modal" data-target="#exampleModal-3">Add
                        Members
                    </button>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>Sr.No</th>
                                            <th>Profile Pic</th>
                                            <th>Member Name</th>
                                            <th>Member Phone Number</th>
                                            <th>Member Email Address</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody id="member-table-view">
                                        <%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
                                        <c:forEach items="${memberList}" var="i" varStatus="j">
                                            <tr>

                                                <td>${j.count}</td>
                                                <td> <img  src="<%=request.getContextPath()%>/documents/memberPhotos/${i.fileName}" alt="${i.memberName}"></td>
                                                <td>${i.memberName}</td>
                                                <td>${i.memberPhoneNo}</td>
                                                <td>${i.memberEmail}</td>
                                                <td>
                                                    <button class="btn btn-outline-info" data-toggle="modal"
                                                            data-target="#exampleModal-edit"
                                                            onclick="editMember(${i.id})">
                                                        Edit
                                                    </button>
                                                    <a href="deleteMember/${i.id}">
                                                        <button class="btn btn-outline-danger"
                                                                data-toggle="modal"
                                                                data-target="#exampleModal-3">
                                                            Delete
                                                        </button>
                                                    </a></td>
                                            </tr>
                                        </c:forEach>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
            <!-- partial:../../partials/_footer.html -->

            <jsp:include page="footer.jsp"></jsp:include>

            <!-- partial -->
        </div>
        <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
</div>
<!-- container-scroller -->
<!-- base:js -->
<script src="<%=request.getContextPath()%>/adminResources/js/manageMember.js"></script>
<script src="<%=request.getContextPath()%>/adminResources/js/vendor.bundle.base.js"></script>
<!-- endinject -->
<!-- inject:js -->
<script src="<%=request.getContextPath()%>/adminResources/js/off-canvas.js"></script>
<script src="<%=request.getContextPath()%>/adminResources/js/hoverable-collapse.js"></script>
<script src="<%=request.getContextPath()%>/adminResources/js/template.js"></script>
<script src="<%=request.getContextPath()%>/adminResources/js/settings.js"></script>
<script src="<%=request.getContextPath()%>/adminResources/js/todolist.js"></script>
<!-- endinject -->
<!-- plugin js for this page -->
<script src="<%=request.getContextPath()%>/adminResources/js/jquery.dataTables.js"></script>
<script src="<%=request.getContextPath()%>/adminResources/js/dataTables.bootstrap4.js"></script>
<!-- End plugin js for this page -->
<!-- Custom js for this page-->
<script src="<%=request.getContextPath()%>/adminResources/js/data-table.js"></script>
<!-- End custom js for this page-->
</body>
</html>
