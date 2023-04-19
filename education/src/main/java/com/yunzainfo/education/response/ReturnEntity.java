package com.yunzainfo.education.response;

//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

import java.beans.ConstructorProperties;
import java.io.Serializable;

public class ReturnEntity<T> implements Serializable {
    private static final long serialVersionUID = -4803045090951151710L;
    private String message;
    private T data;
    private String errorMessage;

    @ConstructorProperties({"message", "data", "errorMessage"})
    ReturnEntity(final String message, final T data, final String errorMessage) {
        this.message = message;
        this.data = data;
        this.errorMessage = errorMessage;
    }

    public static <T> ReturnEntity.ReturnEntityBuilder<T> builder() {
        return new ReturnEntity.ReturnEntityBuilder();
    }

    public String getMessage() {
        return this.message;
    }

    public T getData() {
        return this.data;
    }

    public String getErrorMessage() {
        return this.errorMessage;
    }

    public void setMessage(final String message) {
        this.message = message;
    }

    public void setData(final T data) {
        this.data = data;
    }

    public void setErrorMessage(final String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof ReturnEntity)) {
            return false;
        } else {
            ReturnEntity<?> other = (ReturnEntity)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                label47: {
                    Object this$message = this.getMessage();
                    Object other$message = other.getMessage();
                    if (this$message == null) {
                        if (other$message == null) {
                            break label47;
                        }
                    } else if (this$message.equals(other$message)) {
                        break label47;
                    }

                    return false;
                }

                Object this$data = this.getData();
                Object other$data = other.getData();
                if (this$data == null) {
                    if (other$data != null) {
                        return false;
                    }
                } else if (!this$data.equals(other$data)) {
                    return false;
                }

                Object this$errorMessage = this.getErrorMessage();
                Object other$errorMessage = other.getErrorMessage();
                if (this$errorMessage == null) {
                    if (other$errorMessage != null) {
                        return false;
                    }
                } else if (!this$errorMessage.equals(other$errorMessage)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ReturnEntity;
    }

    public int hashCode() {
        boolean PRIME = true;
        int result = 1;
        Object $message = this.getMessage();
        result = result * 59 + ($message == null ? 43 : $message.hashCode());
        Object $data = this.getData();
        result = result * 59 + ($data == null ? 43 : $data.hashCode());
        Object $errorMessage = this.getErrorMessage();
        result = result * 59 + ($errorMessage == null ? 43 : $errorMessage.hashCode());
        return result;
    }

    public String toString() {
        return "ReturnEntity(message=" + this.getMessage() + ", data=" + this.getData() + ", errorMessage=" + this.getErrorMessage() + ")";
    }

    public static class ReturnEntityBuilder<T> {
        private String message;
        private T data;
        private String errorMessage;

        ReturnEntityBuilder() {
        }

        public ReturnEntity.ReturnEntityBuilder<T> message(final String message) {
            this.message = message;
            return this;
        }

        public ReturnEntity.ReturnEntityBuilder<T> data(final T data) {
            this.data = data;
            return this;
        }

        public ReturnEntity.ReturnEntityBuilder<T> errorMessage(final String errorMessage) {
            this.errorMessage = errorMessage;
            return this;
        }

        public ReturnEntity<T> build() {
            return new ReturnEntity(this.message, this.data, this.errorMessage);
        }

        public String toString() {
            return "ReturnEntity.ReturnEntityBuilder(message=" + this.message + ", data=" + this.data + ", errorMessage=" + this.errorMessage + ")";
        }
    }
}

