<%@ page contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8"/>
    <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Admin | Owner Details</title>
    <!-- base:css -->
    <link
            rel="stylesheet"
            href="<%=request.getContextPath()%>/adminResources/css/materialdesignicons.min.css"
    />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/adminResources/css/vendor.bundle.base.css"/>
    <!-- endinject -->
    <!-- plugin css for this page -->
    <link
            rel="stylesheet"
            href="<%=request.getContextPath()%>/adminResources/css/dataTables.bootstrap4.css"
    />
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/adminResources/css/style.css"/>
    <!-- endinject -->
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/adminResources/image/favicon.png"/>
</head>

<body>
<div class="container-scroller">
    <!-- partial:partials/_navbar.html -->

    <jsp:include page="header.jsp"/>

    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
        <!-- partial:partials/_sidebar.html -->

        <jsp:include page="menu.jsp"/>

        <%-- <%@taglib prefix="f" uri="http://www.springframework.org/tags/form"
        %>--%>
        <%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>


        <%--        Owner Edit Model Starts--%>

        <div
                class="modal fade"
                id="exampleModal-3"
                tabindex="-1"
                role="dialog"
                aria-labelledby="ModalLabel"
                aria-hidden="true"

        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabelEditOwner">Edit Owner</h5>
                        <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onclick="emptyForm()"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class=" row">
                            <input
                                    type="hidden"
                                    class="form-control"
                                    id="owner-edit-id"
                            />
                            <div class="col-lg-6">
                                <label for="owner-edit-block-no" class="col-form-label"
                                >Block Name :
                                </label>

                               <select class="form-control" id="owner-edit-block-no">
                                   <option id="block" disabled selected >- -</option>
                               </select>
                            </div>
                            <div class="col-lg-6">
                                <label for="owner-edit-floor-no" class="col-form-label"
                                >Floor No :
                                </label>

                                <select class="form-control" id="owner-edit-floor-no">
                                    <option id="floor" disabled selected >- -</option>
                                </select>
                            </div>
                        </div>
                        <div class=" row">
                            <div class="col-lg-12">
                                <label for="owner-edit-house-no" class="col-form-label"
                                >Owner House No :
                                </label>

                                <input
                                        type="text"
                                        class="form-control"
                                        id="owner-edit-house-no"
                                        disabled="disabled"
                                />
                            </div>
                        </div>
                        <div class=" row">
                            <div class="col-lg-12">
                                <label for="owner-edit-name" class="col-form-label"
                                >Owner Name :
                                </label>

                                <input
                                        type="text"
                                        class="form-control"
                                        id="owner-edit-name"
                                />
                            </div>
                        </div>
                        <div class=" row">
                            <div class="col-lg-12">
                                <label for="owner-edit-email" class="col-form-label"
                                >Owner Email Address :
                                </label>

                                <input
                                        type="text"
                                        class="form-control"
                                        id="owner-edit-email"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary"
                                type="submit"
                                value="Submit"
                                data-dismiss="modal"
                                aria-label="Close"
                                onclick="updateOwnerObj()"
                                id="submit">Update
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
                </div>
            </div>
        </div>
        <%--        Owner Edit Model Ends--%>

        <!--Owner Add Modal starts -->

        <div
                class="modal fade"
                id="exampleModal-1"
                tabindex="-1"
                role="dialog"
                aria-labelledby="ModalLabel"
                aria-hidden="true"
        >
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">Add Owners</h5>
                        <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onclick="emptyForm()"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form action="ownerName" method="post" class="model-form">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-4">
                                    <label class="col-form-label"
                                    >Block Name :
                                    </label>
                                    <select
                                            class="form-control"
                                            name="blockId"
                                            id="block-name-form"
                                            onchange="blockChange(this)"
                                    >
                                        <option value="null" disabled selected>
                                            Select Block Name
                                        </option>
                                        <c:forEach items="${blockList}" var="i" varStatus="">
                                            <c:if test="${i.status}">
                                                <option value="${i.id}">${i.blockName}</option>
                                            </c:if>
                                        </c:forEach>
                                    </select>
                                </div>
                                <div class="col-lg-4">
                                    <label for="number-of-floors" class="col-form-label"
                                    >Floor:
                                    </label>
                                    <select
                                            class="form-control"
                                            id="number-of-floors"
                                            name="floorNumber"
                                            onchange="floorChange(this)"
                                    >
                                        <option value="">- -</option>
                                    </select>
                                </div>
                                <div class="col-lg-4">
                                    <label for="number-of-floors" class="col-form-label"
                                    >Number Of House:
                                    </label>
                                    <input
                                            type="text"
                                            name=""
                                            value="- -"
                                            class="form-control"
                                            id="number-of-house"
                                            disabled
                                    />
                                </div>
                            </div>
                            <div class="row" id="house-numbers-label"></div>
                            <div class="row">
                                <div class="col-lg-12" id="house-numbers-ownwers"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                    class="btn btn-primary"
                                    type="submit"
                                    value="Submit"
                                    id="submit-model"
                            >
                                Submit
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

        <!-- Modal Ends -->

        <!-- partial -->

        <div class="main-panel">
            <div class="content-wrapper">
                <h3 class="main-title">Owner Details</h3>
                <div
                        class="d-flex justify-content-between align-content-center"
                        style="margin-bottom: 20px"
                >
                    <nav
                            aria-label="breadcrumb d-flex align-content-center"
                            class="bread"
                    >
                        <ol class="breadcrumb border-0 p-0 d-flex align-content-center">
                            <li class="breadcrumb-item"><a href="index">Dashboard</a></li>
                            <li class="breadcrumb-item active" aria-current="page">
                                Manage Owners
                            </li>
                        </ol>
                    </nav>
                    <button
                            type="button"
                            class="btn btn-primary btn-sm"
                            data-toggle="modal"
                            data-target="#exampleModal-1"
                    >
                        Add Owners
                    </button>
                </div>
                <div class="row ">
                    <div class="col-lg-3">
                        <label for="blockSearch" class="col-form-label"
                        >Block Name:
                        </label>
                    </div>
                    <div class="col-lg-3">
                        <label for="number-of-floors-search" class="col-form-label"
                        >Floor No:
                        </label>
                    </div>
                </div>
                <div class="row  mb-2">
                    <div class="col-lg-3">
                        <select
                                class="form-control"
                                name="blockId"
                                id="blockSearch"
                                onchange="blockChangeForTable(this)"
                        >
                            <option value="" disabled selected>Select Block Name</option>
                            <c:forEach items="${blockList}" var="i" varStatus="">
                                <c:if test="${i.status}">
                                    <option value="${i.id}">${i.blockName}</option>
                                </c:if>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="col-lg-3">
                        <select
                                class="form-control"
                                id="number-of-floors-search"
                                name="floorNumber"
                                onchange="bringOwnersToTable(this)"
                        >
                            <option value="">- -</option>
                        </select>
                    </div>
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
                                            <th>House Number</th>
                                            <th>Owner Name</th>
                                            <th>Owner Email Address</th>
                                            <th>Edit</th>
                                        </tr>
                                        </thead>
                                        <tbody id="owner-table">
                                        <tr>
                                            <td colspan="5" style="text-align: center; padding: 50px">- -</td>
                                        </tr>
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

            <jsp:include page="../user/footer.jsp"></jsp:include>

            <!-- partial -->
        </div>
        <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
</div>
<!-- container-scroller -->
<!-- base:js -->
<script src="<%=request.getContextPath()%>/adminResources/js/manageOwner.js"></script>
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
