﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.18408
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FreeCar.Web.FreeCarService {
    using System.Runtime.Serialization;
    using System;
    
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="Car", Namespace="http://schemas.datacontract.org/2004/07/FreeCar.Entities")]
    [System.SerializableAttribute()]
    public partial class Car : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int CarModelIdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private FreeCar.Web.FreeCarService.CarColor ColorField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private FreeCar.Web.FreeCarService.CarDriverHistory[] DriversHistoryField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int IdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool IsActiveField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private FreeCar.Web.FreeCarService.CarModel ModelField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string NameField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string NumberField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private FreeCar.Web.FreeCarService.TechData TechDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private System.Nullable<int> TechDataIdField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int CarModelId {
            get {
                return this.CarModelIdField;
            }
            set {
                if ((this.CarModelIdField.Equals(value) != true)) {
                    this.CarModelIdField = value;
                    this.RaisePropertyChanged("CarModelId");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public FreeCar.Web.FreeCarService.CarColor Color {
            get {
                return this.ColorField;
            }
            set {
                if ((this.ColorField.Equals(value) != true)) {
                    this.ColorField = value;
                    this.RaisePropertyChanged("Color");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public FreeCar.Web.FreeCarService.CarDriverHistory[] DriversHistory {
            get {
                return this.DriversHistoryField;
            }
            set {
                if ((object.ReferenceEquals(this.DriversHistoryField, value) != true)) {
                    this.DriversHistoryField = value;
                    this.RaisePropertyChanged("DriversHistory");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int Id {
            get {
                return this.IdField;
            }
            set {
                if ((this.IdField.Equals(value) != true)) {
                    this.IdField = value;
                    this.RaisePropertyChanged("Id");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool IsActive {
            get {
                return this.IsActiveField;
            }
            set {
                if ((this.IsActiveField.Equals(value) != true)) {
                    this.IsActiveField = value;
                    this.RaisePropertyChanged("IsActive");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public FreeCar.Web.FreeCarService.CarModel Model {
            get {
                return this.ModelField;
            }
            set {
                if ((object.ReferenceEquals(this.ModelField, value) != true)) {
                    this.ModelField = value;
                    this.RaisePropertyChanged("Model");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Name {
            get {
                return this.NameField;
            }
            set {
                if ((object.ReferenceEquals(this.NameField, value) != true)) {
                    this.NameField = value;
                    this.RaisePropertyChanged("Name");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Number {
            get {
                return this.NumberField;
            }
            set {
                if ((object.ReferenceEquals(this.NumberField, value) != true)) {
                    this.NumberField = value;
                    this.RaisePropertyChanged("Number");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public FreeCar.Web.FreeCarService.TechData TechData {
            get {
                return this.TechDataField;
            }
            set {
                if ((object.ReferenceEquals(this.TechDataField, value) != true)) {
                    this.TechDataField = value;
                    this.RaisePropertyChanged("TechData");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.Nullable<int> TechDataId {
            get {
                return this.TechDataIdField;
            }
            set {
                if ((this.TechDataIdField.Equals(value) != true)) {
                    this.TechDataIdField = value;
                    this.RaisePropertyChanged("TechDataId");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="CarModel", Namespace="http://schemas.datacontract.org/2004/07/FreeCar.Entities")]
    [System.SerializableAttribute()]
    public partial class CarModel : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private FreeCar.Web.FreeCarService.CarBrand BrandField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int CarBrandIdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int IdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string NameField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public FreeCar.Web.FreeCarService.CarBrand Brand {
            get {
                return this.BrandField;
            }
            set {
                if ((object.ReferenceEquals(this.BrandField, value) != true)) {
                    this.BrandField = value;
                    this.RaisePropertyChanged("Brand");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int CarBrandId {
            get {
                return this.CarBrandIdField;
            }
            set {
                if ((this.CarBrandIdField.Equals(value) != true)) {
                    this.CarBrandIdField = value;
                    this.RaisePropertyChanged("CarBrandId");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int Id {
            get {
                return this.IdField;
            }
            set {
                if ((this.IdField.Equals(value) != true)) {
                    this.IdField = value;
                    this.RaisePropertyChanged("Id");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Name {
            get {
                return this.NameField;
            }
            set {
                if ((object.ReferenceEquals(this.NameField, value) != true)) {
                    this.NameField = value;
                    this.RaisePropertyChanged("Name");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="TechData", Namespace="http://schemas.datacontract.org/2004/07/FreeCar.Entities")]
    [System.SerializableAttribute()]
    public partial class TechData : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int IdField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int Id {
            get {
                return this.IdField;
            }
            set {
                if ((this.IdField.Equals(value) != true)) {
                    this.IdField = value;
                    this.RaisePropertyChanged("Id");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="CarColor", Namespace="http://schemas.datacontract.org/2004/07/FreeCar.Entities")]
    public enum CarColor : int {
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        Black = 0,
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        White = 1,
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        Green = 2,
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        Red = 3,
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        Blue = 4,
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        Gray = 5,
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        Metallic = 6,
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        Yellow = 7,
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        Pink = 8,
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        Orange = 9,
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="CarDriverHistory", Namespace="http://schemas.datacontract.org/2004/07/FreeCar.Entities")]
    [System.SerializableAttribute()]
    public partial class CarDriverHistory : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private FreeCar.Web.FreeCarService.Car CarField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int CarIdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private System.DateTime DateStartField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private System.Nullable<System.DateTime> DateStopField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private FreeCar.Web.FreeCarService.Driver DriverField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string DriverIdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int IdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool IsMainField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool IsReadyField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool OnLineField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public FreeCar.Web.FreeCarService.Car Car {
            get {
                return this.CarField;
            }
            set {
                if ((object.ReferenceEquals(this.CarField, value) != true)) {
                    this.CarField = value;
                    this.RaisePropertyChanged("Car");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int CarId {
            get {
                return this.CarIdField;
            }
            set {
                if ((this.CarIdField.Equals(value) != true)) {
                    this.CarIdField = value;
                    this.RaisePropertyChanged("CarId");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.DateTime DateStart {
            get {
                return this.DateStartField;
            }
            set {
                if ((this.DateStartField.Equals(value) != true)) {
                    this.DateStartField = value;
                    this.RaisePropertyChanged("DateStart");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.Nullable<System.DateTime> DateStop {
            get {
                return this.DateStopField;
            }
            set {
                if ((this.DateStopField.Equals(value) != true)) {
                    this.DateStopField = value;
                    this.RaisePropertyChanged("DateStop");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public FreeCar.Web.FreeCarService.Driver Driver {
            get {
                return this.DriverField;
            }
            set {
                if ((object.ReferenceEquals(this.DriverField, value) != true)) {
                    this.DriverField = value;
                    this.RaisePropertyChanged("Driver");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string DriverId {
            get {
                return this.DriverIdField;
            }
            set {
                if ((object.ReferenceEquals(this.DriverIdField, value) != true)) {
                    this.DriverIdField = value;
                    this.RaisePropertyChanged("DriverId");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int Id {
            get {
                return this.IdField;
            }
            set {
                if ((this.IdField.Equals(value) != true)) {
                    this.IdField = value;
                    this.RaisePropertyChanged("Id");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool IsMain {
            get {
                return this.IsMainField;
            }
            set {
                if ((this.IsMainField.Equals(value) != true)) {
                    this.IsMainField = value;
                    this.RaisePropertyChanged("IsMain");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool IsReady {
            get {
                return this.IsReadyField;
            }
            set {
                if ((this.IsReadyField.Equals(value) != true)) {
                    this.IsReadyField = value;
                    this.RaisePropertyChanged("IsReady");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool OnLine {
            get {
                return this.OnLineField;
            }
            set {
                if ((this.OnLineField.Equals(value) != true)) {
                    this.OnLineField = value;
                    this.RaisePropertyChanged("OnLine");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="Driver", Namespace="http://schemas.datacontract.org/2004/07/FreeCar.Entities")]
    [System.SerializableAttribute()]
    public partial class Driver : FreeCar.Web.FreeCarService.WebUser {
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private FreeCar.Web.FreeCarService.CarDriverHistory[] CarsHistoryField;
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public FreeCar.Web.FreeCarService.CarDriverHistory[] CarsHistory {
            get {
                return this.CarsHistoryField;
            }
            set {
                if ((object.ReferenceEquals(this.CarsHistoryField, value) != true)) {
                    this.CarsHistoryField = value;
                    this.RaisePropertyChanged("CarsHistory");
                }
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="IdentityUserOfstringIdentityUserLoginIdentityUserRoleIdentityUserClaim39AeZpW1", Namespace="http://schemas.datacontract.org/2004/07/Microsoft.AspNet.Identity.EntityFramework" +
        "")]
    [System.SerializableAttribute()]
    [System.Runtime.Serialization.KnownTypeAttribute(typeof(FreeCar.Web.FreeCarService.IdentityUser))]
    [System.Runtime.Serialization.KnownTypeAttribute(typeof(FreeCar.Web.FreeCarService.WebUser))]
    [System.Runtime.Serialization.KnownTypeAttribute(typeof(FreeCar.Web.FreeCarService.Driver))]
    public partial class IdentityUserOfstringIdentityUserLoginIdentityUserRoleIdentityUserClaim39AeZpW1 : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int AccessFailedCountField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string EmailField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool EmailConfirmedField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string IdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool LockoutEnabledField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private System.Nullable<System.DateTime> LockoutEndDateUtcField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string PasswordHashField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string PhoneNumberField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool PhoneNumberConfirmedField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string SecurityStampField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool TwoFactorEnabledField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string UserNameField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int AccessFailedCount {
            get {
                return this.AccessFailedCountField;
            }
            set {
                if ((this.AccessFailedCountField.Equals(value) != true)) {
                    this.AccessFailedCountField = value;
                    this.RaisePropertyChanged("AccessFailedCount");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Email {
            get {
                return this.EmailField;
            }
            set {
                if ((object.ReferenceEquals(this.EmailField, value) != true)) {
                    this.EmailField = value;
                    this.RaisePropertyChanged("Email");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool EmailConfirmed {
            get {
                return this.EmailConfirmedField;
            }
            set {
                if ((this.EmailConfirmedField.Equals(value) != true)) {
                    this.EmailConfirmedField = value;
                    this.RaisePropertyChanged("EmailConfirmed");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Id {
            get {
                return this.IdField;
            }
            set {
                if ((object.ReferenceEquals(this.IdField, value) != true)) {
                    this.IdField = value;
                    this.RaisePropertyChanged("Id");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool LockoutEnabled {
            get {
                return this.LockoutEnabledField;
            }
            set {
                if ((this.LockoutEnabledField.Equals(value) != true)) {
                    this.LockoutEnabledField = value;
                    this.RaisePropertyChanged("LockoutEnabled");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.Nullable<System.DateTime> LockoutEndDateUtc {
            get {
                return this.LockoutEndDateUtcField;
            }
            set {
                if ((this.LockoutEndDateUtcField.Equals(value) != true)) {
                    this.LockoutEndDateUtcField = value;
                    this.RaisePropertyChanged("LockoutEndDateUtc");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string PasswordHash {
            get {
                return this.PasswordHashField;
            }
            set {
                if ((object.ReferenceEquals(this.PasswordHashField, value) != true)) {
                    this.PasswordHashField = value;
                    this.RaisePropertyChanged("PasswordHash");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string PhoneNumber {
            get {
                return this.PhoneNumberField;
            }
            set {
                if ((object.ReferenceEquals(this.PhoneNumberField, value) != true)) {
                    this.PhoneNumberField = value;
                    this.RaisePropertyChanged("PhoneNumber");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool PhoneNumberConfirmed {
            get {
                return this.PhoneNumberConfirmedField;
            }
            set {
                if ((this.PhoneNumberConfirmedField.Equals(value) != true)) {
                    this.PhoneNumberConfirmedField = value;
                    this.RaisePropertyChanged("PhoneNumberConfirmed");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string SecurityStamp {
            get {
                return this.SecurityStampField;
            }
            set {
                if ((object.ReferenceEquals(this.SecurityStampField, value) != true)) {
                    this.SecurityStampField = value;
                    this.RaisePropertyChanged("SecurityStamp");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool TwoFactorEnabled {
            get {
                return this.TwoFactorEnabledField;
            }
            set {
                if ((this.TwoFactorEnabledField.Equals(value) != true)) {
                    this.TwoFactorEnabledField = value;
                    this.RaisePropertyChanged("TwoFactorEnabled");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string UserName {
            get {
                return this.UserNameField;
            }
            set {
                if ((object.ReferenceEquals(this.UserNameField, value) != true)) {
                    this.UserNameField = value;
                    this.RaisePropertyChanged("UserName");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="IdentityUser", Namespace="http://schemas.datacontract.org/2004/07/Microsoft.AspNet.Identity.EntityFramework" +
        "")]
    [System.SerializableAttribute()]
    [System.Runtime.Serialization.KnownTypeAttribute(typeof(FreeCar.Web.FreeCarService.WebUser))]
    [System.Runtime.Serialization.KnownTypeAttribute(typeof(FreeCar.Web.FreeCarService.Driver))]
    public partial class IdentityUser : FreeCar.Web.FreeCarService.IdentityUserOfstringIdentityUserLoginIdentityUserRoleIdentityUserClaim39AeZpW1 {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="WebUser", Namespace="http://schemas.datacontract.org/2004/07/FreeCar.Entities")]
    [System.SerializableAttribute()]
    [System.Runtime.Serialization.KnownTypeAttribute(typeof(FreeCar.Web.FreeCarService.Driver))]
    public partial class WebUser : FreeCar.Web.FreeCarService.IdentityUser {
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int PhoneNomberField;
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int PhoneNomber {
            get {
                return this.PhoneNomberField;
            }
            set {
                if ((this.PhoneNomberField.Equals(value) != true)) {
                    this.PhoneNomberField = value;
                    this.RaisePropertyChanged("PhoneNomber");
                }
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="CarBrand", Namespace="http://schemas.datacontract.org/2004/07/FreeCar.Entities")]
    [System.SerializableAttribute()]
    public partial class CarBrand : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private FreeCar.Web.FreeCarService.Country[] CountriesField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int IdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string NameField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public FreeCar.Web.FreeCarService.Country[] Countries {
            get {
                return this.CountriesField;
            }
            set {
                if ((object.ReferenceEquals(this.CountriesField, value) != true)) {
                    this.CountriesField = value;
                    this.RaisePropertyChanged("Countries");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int Id {
            get {
                return this.IdField;
            }
            set {
                if ((this.IdField.Equals(value) != true)) {
                    this.IdField = value;
                    this.RaisePropertyChanged("Id");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Name {
            get {
                return this.NameField;
            }
            set {
                if ((object.ReferenceEquals(this.NameField, value) != true)) {
                    this.NameField = value;
                    this.RaisePropertyChanged("Name");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="Country", Namespace="http://schemas.datacontract.org/2004/07/FreeCar.Entities")]
    [System.SerializableAttribute()]
    public partial class Country : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int IdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string NameField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int Id {
            get {
                return this.IdField;
            }
            set {
                if ((this.IdField.Equals(value) != true)) {
                    this.IdField = value;
                    this.RaisePropertyChanged("Id");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Name {
            get {
                return this.NameField;
            }
            set {
                if ((object.ReferenceEquals(this.NameField, value) != true)) {
                    this.NameField = value;
                    this.RaisePropertyChanged("Name");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="FreeCarService.IFreeCarService")]
    public interface IFreeCarService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IFreeCarService/GetActiveCars", ReplyAction="http://tempuri.org/IFreeCarService/GetActiveCarsResponse")]
        FreeCar.Web.FreeCarService.Car[] GetActiveCars();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IFreeCarService/GetActiveCars", ReplyAction="http://tempuri.org/IFreeCarService/GetActiveCarsResponse")]
        System.Threading.Tasks.Task<FreeCar.Web.FreeCarService.Car[]> GetActiveCarsAsync();
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IFreeCarServiceChannel : FreeCar.Web.FreeCarService.IFreeCarService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class FreeCarServiceClient : System.ServiceModel.ClientBase<FreeCar.Web.FreeCarService.IFreeCarService>, FreeCar.Web.FreeCarService.IFreeCarService {
        
        public FreeCarServiceClient() {
        }

		public FreeCarServiceClient(string endpointConfigurationName) :
			base(endpointConfigurationName)
		{
		}

		public FreeCarServiceClient(string endpointConfigurationName, string remoteAddress) :
			base(endpointConfigurationName, remoteAddress)
		{
		}

		public FreeCarServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) :
			base(endpointConfigurationName, remoteAddress)
		{
		}

		public FreeCarServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) :
			base(binding, remoteAddress)
		{
		}
        
        public FreeCar.Web.FreeCarService.Car[] GetActiveCars() {
            return base.Channel.GetActiveCars();
        }
        
        public System.Threading.Tasks.Task<FreeCar.Web.FreeCarService.Car[]> GetActiveCarsAsync() {
            return base.Channel.GetActiveCarsAsync();
        }
    }
}
